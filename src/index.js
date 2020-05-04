import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { config } from 'dotenv';
config();

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

gqlServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log('Server started on PORT : 4000'));
