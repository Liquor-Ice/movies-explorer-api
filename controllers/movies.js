const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).orFail(
    () => {
      throw new NotFoundError('Нет созранённых фильмов');
    },
  )
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

module.exports.dejeteMovie = (req, res, next) => {
  const { id } = req.params;
  const user = req.user._id;
  Movie.findByIdAndDelete({ movieId: id, owner: user }).orFail(
    () => {
      throw new NotFoundError('Данный пользователь не сохранял такой фильм');
    },
  )
    .then((delmovie) => res.status(200).send({ data: delmovie }))
    .catch(next);
};
