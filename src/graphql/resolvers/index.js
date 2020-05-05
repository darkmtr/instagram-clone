import users from './users';
import posts from './posts';

export default {
  ...posts.Types,
  Query: {
    ...users.Query,
    ...posts.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...posts.Mutation,
  },
};
