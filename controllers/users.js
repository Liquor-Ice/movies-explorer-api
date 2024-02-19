const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id).orFail(
    () => {
      throw new NotFoundError('Пользователь по данному ID не найден');
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  ).orFail(
    () => new BadRequestError('Некорректные данные пользователя'),
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с данным email уже существует'));
      }
      return next(err);
    });
};
