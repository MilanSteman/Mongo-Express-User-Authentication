const router = require('express').Router();
const HomeController = require('../controllers/HomeController');
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const auth = require('../config/auth');

router.get('/', auth.isLoggedIn, HomeController.getHome);

router.get('/login', auth.isLoggedOut, LoginController.getLogin);

router.post('/login', LoginController.loginUser);

router.get('/logout', LoginController.getLogout);

router.get('/register', auth.isLoggedOut, RegisterController.getRegister);

router.post('/register', RegisterController.registerUser);

module.exports = router;