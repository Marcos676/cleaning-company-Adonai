var express = require('express');
var router = express.Router();
const { home, services, login } = require("../controllers/indexController")

/* Home */
router.get('/', home);
/* Budgets and services */
router.get('/abonos-servicios', services);
/* ingresar */
router.get('/ingresar', login);

module.exports = router;
