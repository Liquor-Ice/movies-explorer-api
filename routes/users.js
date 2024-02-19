const router = require('express').Router();
const { celUpdateProfile } = require('../controllers/celebrate');
const { getProfile, updateProfile } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getProfile);
// обновляет информацию о пользователе (email и имя)
router.patch('/me', celUpdateProfile, updateProfile);

module.exports = router;
