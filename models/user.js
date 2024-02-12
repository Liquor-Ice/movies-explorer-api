const mongoose = require('mongoose');
const validator = require('validator');

const userShema = new mongoose.Schema({
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

module.exports = mongoose.model('user', userShema);
