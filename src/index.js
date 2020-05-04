import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { verify } from 'jsonwebtoken';
import models from './models';
import {
  generateAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './auth';

const app = express();

app.use(cookieParser());

app.post('/refresh_token', async (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.jid;

  if (!token) {
    return res.send({ ok: false, token: '' });
  }

  let payload;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, token: '' });
  }

  const user = await models.user.findOne({ where: { id: payload.userId } });

  if (!user) {
    return res.send({ ok: false, token: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({
    ok: false,
    token: generateAccessToken(user.get({ plain: true })),
  });
});

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

gqlServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log('Server started on PORT : 4000'));
