import users from './users';
import posts from './posts';
import comments from './comments';

export default {
  ...posts.Types,
  ...comments.Types,
  Query: {
    hello: () => 'hola',
    ...users.Query,
    ...posts.Query,
    ...comments.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...posts.Mutation,
    ...comments.Mutation,
  },
};
