const router = require('express').Router();
const { celCreateMovie, celDeleteMovie } = require('../controllers/celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', celCreateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', celDeleteMovie, deleteMovie);

module.exports = router;
