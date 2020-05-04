import users from './users';

export default {
  Query: {
    ...users.Query,
  },
  Mutation: {
    ...users.Mutation,
  },
};
