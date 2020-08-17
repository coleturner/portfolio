import crypto from 'crypto';

function hash(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

export const getRateLimiterKey = (req) => {
  const ipAddress = req.connection.remoteAddress;

  // Don't want to store personal data
  const throttleKey = hash(ipAddress);

  return { id: throttleKey };
};

export class RateLimiterMalfunction extends Error {}
export class ScoreExceededError extends Error {}
export class RateLimitExceededError extends Error {}

/**
 * A rate limiter that can handle both number of requests, and the score/weight of all requests
 */
export default function rateLimiter(
  callback,
  {
    max = 50,
    ttlMs = 60 * 1000,
    getKey = getRateLimiterKey,
    maxScore = null,
    getScore = null,
  },
  errorHandler
) {
  return async function rateLimitedAPI(req, res) {
    const wrapper = async () => {
      const rateLimit = req.mongoDB.collection('rateLimit');
      const key = getKey(req);

      const scoring =
        maxScore && getScore ? { $inc: { score: getScore(req) } } : {};

      // Get the rate limit record
      const limitResult = await rateLimit.findOneAndUpdate(
        key,
        {
          ...scoring,
          $push: { hits: new Date() },
        },
        { upsert: true, returnNewDocument: true }
      );

      // Problem with the integration
      if (!limitResult.value && !limitResult.lastErrorObject?.upserted) {
        console.error('Rate limiter malfunctioned, limitResult:', limitResult);
        res.statusCode = 500;
        throw new RateLimiterMalfunction('Rate limiter has malfunctioned');
      }

      // Get the number of hits that still count
      const { score = 0, hits = [] } = limitResult?.value || {};
      const countedHits = hits.filter((hit) => hit >= new Date() - ttlMs);

      // Check the score first
      if (maxScore && score >= maxScore) {
        console.error('Request exceeded score...');
        res.statusCode = 413;
        res.setHeader('X-Rate-Limit-Limit', 0);
        res.setHeader('X-Rate-Limit-Remaining', 0);

        throw new ScoreExceededError('Score has been exceeded.');
      }

      // Calculate the amount remaining
      const remaining = Math.max(0, max - countedHits.length);

      // Ran over the limit
      if (remaining <= 0) {
        console.error('Rate limiter activated!');

        res.statusCode = 429;
        res.setHeader('X-Rate-Limit-Limit', max);
        res.setHeader('X-Rate-Limit-Remaining', remaining);
        res.setHeader(
          'X-Rate-Limit-Reset',
          new Date(new Date().getTime() + ttlMs)
        );

        throw new RateLimitExceededError(
          'Request rate limit has been exceeded.'
        );
      }

      // Update the record when it grows too much
      if (Math.abs(hits - countedHits) > 100) {
        await rateLimit.findOneAndUpdate(
          { _id: limitResult.value._id },
          { $set: { hits: countedHits } },
          { upsert: false }
        );
      }

      return await callback(req, res);
    };

    if (errorHandler) {
      try {
        return await wrapper();
      } catch (e) {
        return await errorHandler(e, req, res);
      }
    } else {
      return await wrapper();
    }
  };
}
