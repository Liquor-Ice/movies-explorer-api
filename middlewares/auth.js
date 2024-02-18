const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret')
    .then((pld) => {
      payload = pld;
    })
    .catch(next(new UnauthorizedError('Необходима авторизация')));

  req.user = payload;

  return next();
};
