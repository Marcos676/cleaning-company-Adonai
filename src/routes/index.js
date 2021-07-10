var express = require('express');
var router = express.Router();
const { home, services, login, loginProcess, logout } = require("../controllers/indexController")

/* middlewares */
const sessionCheck = require('../middlewares/sessionCheck');
const loginValidator = require('../validations/loginValidator');

/* Home */
router.get('/', home);
/* Budgets and services */
router.get('/abonos-servicios', services);
/* ingresar */
router.get('/ingresar', sessionCheck, login);
router.post('/ingresar', loginValidator, loginProcess);
router.get('/logout', logout);

module.exports = router;
