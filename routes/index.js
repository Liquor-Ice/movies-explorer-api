const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celSignup, celSignin } = require('../controllers/celebrate');
const { signup, signin, signout } = require('../controllers/sign');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celSignup, signup);
router.post('/signin', celSignin, signin);
router.post('/signout', signout);

router.use(auth);

router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use('/*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
