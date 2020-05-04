import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  const payload = {
    userId: user.id,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user) => {
  console.log(user);
  const payload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

export const sendRefreshToken = (res, token) => {
  res.cookie('jid', token, { httpOnly: true });
};
