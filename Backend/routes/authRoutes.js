const express= require('express');
const authController= require('../controllers/authController');

const router= express.Router();

router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

router.get('/register', authController.register_get)
router.post('/register', authController.register_post)

router.get('/logout', authController.logout_get);

module.exports= router;