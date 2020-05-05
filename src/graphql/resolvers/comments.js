import { isAuth } from '../../authMiddleware';
import { UserInputError } from 'apollo-server-express';
import models from '../../models';

export default {
  Mutation: {
    createComment: async (_, args, ctx) => {
      isAuth(ctx);

      const { postId, text } = args;

      const postRef = await models.post.findOne({ where: { id: postId } });

      if (!postRef) {
        throw new UserInputError('No post found');
      }

      const userRef = await models.user.findOne({
        where: { id: ctx.payload.userId },
      });

      if (!userRef) {
        throw new UserInputError('No user found');
      }

      const post = postRef.get({ plain: true });

      const user = userRef.get({ plain: true });

      const commentRef = await models.comment.create({
        text,
        userId: user.id,
        postId: post.id,
      });

      console.log(commentRef);

      return 'dsads';
    },
  },
};
