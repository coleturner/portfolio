/* eslint-disable space-before-function-paren */
import { withMongoDB } from '../../../../lib/database';
import { REACTIONS } from '../../../../lib/constants';
import rateLimiter, { getRateLimiterKey } from '../../../../lib/ratelimit';

const addPostReaction = async (req, res) => {
  const {
    query: { id: postId },
  } = req;

  const clientReactions = req.body;

  try {
    const posts = req.mongoDB.collection('posts');

    const mutations = Object.fromEntries(
      Object.entries(clientReactions)
        .filter(([reactionKey]) => {
          return Object.prototype.hasOwnProperty.call(REACTIONS, reactionKey);
        })
        .map(([key, value]) => ['reactions.' + key, value])
    );

    // Nothing to update
    if (!Object.keys(mutations).length) {
      console.error('Reactions mutations was invalid.');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({}));
      return;
    }

    const postDoc = await posts.findOneAndUpdate(
      { postId },
      { $inc: { ...mutations } },
      { upsert: true, returnOriginal: false }
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(postDoc?.value?.reactions || { ok: true }));
  } catch (e) {
    console.error('Error saving reactions', e);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false }));
  }
};

export default withMongoDB(
  rateLimiter(
    addPostReaction,
    {
      max: 50,
      ttl: 60 * 1000,
      getKey: (req) => {
        const {
          query: { id: postId },
        } = req;

        return {
          ...getRateLimiterKey(req),
          postId,
          reason: 'short',
        };
      },
      maxScore: 1000,
      getScore: (req) => {
        const clientReactions = req.body;
        const inputScore = Object.entries(clientReactions)
          .filter(([reactionKey]) => {
            return Object.prototype.hasOwnProperty.call(REACTIONS, reactionKey);
          })
          .map(([, value]) => value)
          .reduce((a, b) => a + b, 0);

        return inputScore;
      },
    },
    function errorHandler(error, req, res) {
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ ok: false, error: error.message }));
    }
  )
);
