const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET, SOLT_ROUND } = process.env;

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret', { expiresIn: '7d' });

      return res.status(200).cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch(next);
};

module.exports.signup = (req, res, next) => {
  const { name, email } = req.body;

  bcrypt.hash(req.body.password, SOLT_ROUND)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({ name: user.name, email: user.email, _id: user._id }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с данным email уже существует'));
      }
      return next(err);
    });
};

// eslint-disable-next-line no-unused-vars
module.exports.signout = (req, res, next) => res.status(200).cookie('token', null, { httpOnly: true }).end();
