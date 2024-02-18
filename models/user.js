const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
    required: [true, 'Поле "email" является обязательным'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" является обязательным'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) { // метод поиска юзера
  this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверный email или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверный email или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
