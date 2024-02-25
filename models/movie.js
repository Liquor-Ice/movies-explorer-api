const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" является обязательным'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" является обязательным'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" является обязательным'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" является обязательным'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" является обязательным'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: [true, 'Поле "thumbnail" является обязательным'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" является обязательным'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" является обязательным'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
