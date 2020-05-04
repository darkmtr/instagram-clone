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
    test: (_, __, ctx) => {
      isAuth(ctx);

      console.log(ctx.payload);

      return 'asdasd';
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

      console.log(userObject);

      const createdSlug = await models.slug.create({
        slug,
        userId: userObject.id,
      });

      const slugObject = createdSlug.get({ plain: true });

      console.log(slugObject);

      const profile = await models.profile.create({ userId: userObject.id });

      const profileObject = profile.get({ plain: true });

      sendRefreshToken(res, createRefreshToken(userObject));

      const token = generateAccessToken(userObject);

      console.log({ token });

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
  },
};
