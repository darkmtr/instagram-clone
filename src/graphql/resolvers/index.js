import users from './users';
import posts from './posts';

export default {
  Query: {
    ...users.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...posts.Mutation,
  },
};
