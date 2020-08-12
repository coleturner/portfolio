/* eslint-disable space-before-function-paren */
import { REACTIONS } from '../../../../lib/constants';
import { withMongoDB } from '../../../../lib/database';

const getPostReations = async (req, res) => {
  const {
    query: { id: postId },
  } = req;

  try {
    const posts = req.mongoDB.collection('posts');

    const postDoc = await posts.findOne({ postId }, { reactions: true });
    const { reactions = {} } = postDoc || {};

    const reactionValues = Object.fromEntries(
      Object.entries(reactions).filter(([key]) =>
        Object.prototype.hasOwnProperty.call(REACTIONS, key)
      )
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(reactionValues));
  } catch (e) {
    console.error(e);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  }
};

export default withMongoDB(getPostReations);
