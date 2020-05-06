import bcrypt, { compare } from 'bcryptjs';

import models from '../../models';
import { checkUserInput } from '../../middleware/validate';
import { UserInputError } from 'apollo-server-express';
import {
  generateAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../../auth';
import { isAuth } from '../../authMiddleware';

export default {
  Query: {
    getCurrentUser: async (_, __, ctx) => {
      isAuth(ctx);

      const userId = ctx.payload.userId;

      const userRow = await models.user.findAll({
        where: { id: userId },
        include: [{ model: models.profile }, { model: models.slug }],
      });

      const user = userRow[0].get({ plain: true });

      user.password = undefined;
      return user;
    },
  },
  Mutation: {
    createUser: async (_, args, { res }) => {
      console.log(res);
      const { username, password, slug } = args;

      const errors = await checkUserInput(args);

      if (Object.keys(errors).length) {
        throw new UserInputError('Invalid Input', { errors });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await models.user.create({
        username,
        password: hashedPassword,
      });

      const userObject = user.get({ plain: true });

      const profile = await models.profile.create({ userId: userObject.id });

      sendRefreshToken(res, createRefreshToken(userObject));

      const token = generateAccessToken(userObject);

      return { token };
    },
    login: async (_, args, { res }) => {
      const { username, password } = args;

      const errors = {};

      if (!username) {
        errors.username = { msg: 'Username is required' };
      }

      if (!password || password.length < 6) {
        errors.username = { msg: 'Password should be at least 6 characters ' };
      }

      if (Object.keys(errors).length) {
        throw new UserInputError('Invalid Input', { errors });
      }

      const user = await models.user.findOne({ where: { username } });

      if (!user) {
        throw new UserInputError('Invalid username or password');
      }

      const userObject = user.get({ plain: true });

      const isPasswordMatching = await compare(password, user.password);

      if (!isPasswordMatching) {
        throw new UserInputError('Invalid username or password');
      }

      sendRefreshToken(res, createRefreshToken(userObject));

      const token = generateAccessToken(userObject);

      return {
        token,
      };
    },
    followUser: async (_, args, ctx) => {
      isAuth(ctx);

      const { userId } = args;

      const followerRef = await models.user.findOne({
        where: { id: ctx.payload.userId },
      });

      if (!followerRef) {
        throw new UserInputError('User not found');
      }

      const didAlreadyFollow = await models.follow.findOne({
        where: { following: userId, follower: ctx.payload.userId },
      });

      if (didAlreadyFollow) {
        await models.follow.destroy({
          where: { following: userId, follower: ctx.payload.userId },
        });

        return {
          ok: true,
        };
      }

      const followingRef = await models.user.findOne({
        where: { id: userId },
      });

      if (!followingRef) {
        throw new UserInputError('User not found');
      }

      const follower = followerRef.get({ plain: true });
      const following = followingRef.get({ plain: true });

      const follow = await models.follow.create({
        follower: follower.id,
        following: following.id,
      });

      console.log(follow);

      return {
        ok: true,
      };
    },
  },
};
