/* eslint-disable space-before-function-paren */
import { withMongoDB } from '../../../../lib/database';
import { REACTIONS } from '../../../../lib/constants';

export default async function addPostReaction(req, res) {
  const {
    query: { id: postId },
  } = req;

  const clientReactions = req.body;

  try {
    await withMongoDB(async ({ postsCollection }) => {
      const posts = postsCollection();

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
        { upsert: true, returnNewDocument: true }
      );

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(postDoc?.reactions || {}));
    });
  } catch (e) {
    console.error('Error saving reactions', e);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  }
}
