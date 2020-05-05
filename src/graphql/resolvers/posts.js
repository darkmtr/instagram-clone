import { isAuth } from '../../authMiddleware';
import models from '../../models';
import {
  AuthenticationError,
  ApolloError,
  UserInputError,
} from 'apollo-server-express';

export function AuthError() {
  throw new AuthenticationError(
    'Unauthorized request : cannot update/delete post.'
  );
}

export function InternalError(err) {
  throw new ApolloError(`Something went wrong!`, '500', { error: err });
}

export default {
  Types: {},
  Query: {
    getPostsByUser: async (_, args) => {
      const { userId } = args;

      const postsRow = await models.post.findAll({
        where: { postedBy: userId },
      });

      const userRef = await models.user.findOne({
        where: { id: userId },
        include: [{ model: models.profile }],
      });

      const user = userRef.get({ plain: true });

      const posts = postsRow.map((post) => {
        const p = post.get({ plain: true });

        p.postedBy = user;

        return p;
      });

      return posts;
    },
    getPostById: async (_, args) => {
      const { postId } = args;

      const postRef = await models.post.findOne({
        where: { id: postId },
        include: [{ model: models.comment }],
      });

      const post = postRef.get({ plain: true });

      return post;
    },
  },
  Mutation: {
    createPost: async (_, args, ctx) => {
      isAuth(ctx);

      const { description, image, tags } = args;

      const userId = ctx.payload.userId;

      let userRow;

      try {
        userRow = await models.user.findOne({
          where: { id: userId },
          include: [{ model: models.profile }],
        });
      } catch (err) {
        throw new Error('Error during query to database');
      }

      const user = userRow.get({ plain: true });

      if (!userRow) {
        throw new AuthenticationError('Invalid User');
      }

      let newPost;
      try {
        newPost = await models.post.create({
          postedBy: user.id,
          image,
          description,
          tags,
        });
      } catch (err) {
        console.log(err);
        InternalError(err);
      }

      const post = newPost.get({ plain: true });

      post.postedBy = user;

      return post;
    },
    updatePost: async (_, args, ctx) => {
      isAuth(ctx);

      const { postId, description, tags } = args;

      const postRow = await models.post.findOne({ where: { id: postId } });

      if (!postRow) {
        throw new UserInputError('No post found');
      }

      const userRow = await models.user.findOne({
        where: { id: ctx.payload.userId },
        include: [{ model: models.profile }],
      });

      if (!userRow) {
        throw new UserInputError('Invalid User');
      }

      const post = postRow.get({ plain: true });

      const user = userRow.get({ plain: true });

      if (post.postedBy !== user.id) {
        AuthError();
      }

      let editedPost;

      try {
        editedPost = await postRow.update({
          description,
          tags,
        });
      } catch (err) {
        InternalError(err);
      }

      const updatedPost = editedPost.get({ plain: true });

      updatedPost.postedBy = user;

      return updatedPost;
    },
    deletePost: async (_, args, ctx) => {
      isAuth(ctx);
      const { postId } = args;

      const postRow = await models.post.findOne({ where: { id: postId } });

      if (!postRow) {
        throw new UserInputError('No post found');
      }

      const userRow = await models.user.findOne({
        where: { id: ctx.payload.userId },
      });

      if (!userRow) {
        throw new UserInputError('No User found');
      }

      const user = userRow.get({ plain: true });

      const post = postRow.get({ plain: true });

      if (post.postedBy !== user.id) {
        AuthError();
      }

      let deletedPost;

      try {
        deletedPost = await models.post.destroy({
          where: {
            id: postId,
          },
        });
      } catch (err) {
        InternalError(err);
      }
      return {
        ok: true,
      };
    },
    likePost: async (_, args, ctx) => {
      isAuth(ctx);

      const { postId } = args;

      const didUserLikePost = await models.like.findOne({
        where: { userId: ctx.payload.userId, postId },
      });

      if (didUserLikePost) {
        await models.like.destroy({
          where: { userId: ctx.payload.userId, postId },
        });

        return {
          ok: true,
        };
      }

      const postRef = await models.post.findOne({ where: { id: postId } });

      if (!postRef) {
        throw new UserInputError('Post does not exist');
      }

      const post = postRef.get({ plain: true });

      const userRef = await models.user.findOne({
        where: { id: ctx.payload.userId },
      });

      if (!userRef) {
        throw new UserInputError('User does not exist');
      }

      const user = userRef.get({ plain: true });

      console.log(user);

      const likeRef = await models.like.create({
        postId: post.id,
        userId: user.id,
      });

      const like = likeRef.get({ plain: true });

      return {
        ok: true,
      };
    },
  },
};
