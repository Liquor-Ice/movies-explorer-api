const { celebrate, Joi } = require('celebrate');

const celUpdataProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const celCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?([\w-]+)\.(\S+)(#$)?/),
    trailerLink: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?([\w-]+)\.(\S+)(#$)?/),
    thumbnail: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?([\w-]+)\.(\S+)(#$)?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const celDeleteMovie = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const celSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export {
  celUpdataProfile, celCreateMovie, celDeleteMovie, celSignin, celSignup,
};
