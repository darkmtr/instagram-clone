import models from '../models';

export const checkUserInput = async (args) => {
  const { username, password, slug } = args;

  const errors = {};

  if (!username) {
    errors.username = { msg: 'Username is not provided' };
  } else {
    const user = await models.user.findOne({
      where: { username },
    });

    if (user) {
      errors.username = { msg: ' Username is already taken' };
    }
  }

  if (!password || password.length < 6) {
    errors.password = { msg: 'Password must be at least 6 characters long' };
  }

  if (!slug) {
    errors.slug = { msg: 'Slug is not provided' };
  } else {
    const savedSlug = await models.slug.findOne({ where: { slug } });

    if (savedSlug) {
      errors.slug = { msg: 'Slug is already in use' };
    }
  }

  return errors;
};
