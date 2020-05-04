import { AuthenticationError } from 'apollo-server-express';
import jwt, { verify } from 'jsonwebtoken';

export const isAuth = (ctx) => {
  const token = ctx.req.headers['authorization'];

  if (!token) {
    throw new AuthenticationError('No token provided');
  }
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    ctx.payload = payload;
  } catch (err) {
    console.log(err);
    throw new AuthenticationError('Invalid Token');
  }
};
