require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(auth);

app.use('/movies', require('./routes/movies'));
app.use('/users', require('./routes/users'));

app.use('/*', () => { throw new NotFoundError('Страница не найдена'); });

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
