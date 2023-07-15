const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Необходима авторизация!'));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'secret_key' : process.env.JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
