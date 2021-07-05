var express = require('express');
var router = express.Router();
const { home, services, login, loginProcess, logout } = require("../controllers/indexController")

/* Home */
router.get('/', home);
/* Budgets and services */
router.get('/abonos-servicios', services);
/* ingresar */
router.get('/ingresar', login);
router.post('/ingresar', loginProcess);
router.get('/logout', logout);

module.exports = router;
