import { isAuth } from '../../authMiddleware';
import { UserInputError } from 'apollo-server-express';
import models from '../../models';
import { AuthError, InternalError } from './posts';

export default {
  Types: {
    Comment: {
      author: async (parent, _, ctx) => {
        return ctx.userLoader.load(parent.userId);
      },
    },
  },

  Query: {
    getCommentsByPost: async (_, args) => {
      const { postId, page, limit } = args;

      const commentsRef = await models.comment.findAll({
        where: { postId },
        limit: limit ? limit : 10,
        offset: page ? page - 1 : 0,
        order: [['createdAt', 'DESC']],
      });

      const comments = commentsRef.map((ref) => {
        const comment = ref.get({ plain: true });
        comment.author = comment.userId;
        return comment;
      });

      return comments;
    },
  },
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

      const comment = commentRef.get({ plain: true });
      comment.author = comment.userId;
      return comment;
    },
    deleteComment: async (_, args, ctx) => {
      isAuth(ctx);

      const { commentId } = args;

      const commentRef = await models.comment.findOne({
        where: { id: commentId },
      });

      if (!commentRef) {
        throw new UserInputError('Comment cannot be found');
      }

      const comment = commentRef.get({ plain: true });

      const userRef = await models.user.findOne({
        where: { id: ctx.payload.userId },
      });

      const user = userRef.get({ plain: true });

      if (comment.userId !== user.id) {
        AuthError();
      }

      try {
        await models.comment.destroy({
          where: { id: commentId },
        });
      } catch (err) {
        console.log(err);
        InternalError(err);
      }

      return {
        ok: true,
      };
    },
  },
};
