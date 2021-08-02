var express = require('express');
var router = express.Router();
const { home, services, login, loginProcess, logout, consult, cvProcess } = require("../controllers/indexController")

/* middlewares */
const sessionCheck = require('../middlewares/sessionCheck');
const loginValidator = require('../validations/loginValidator');
const consultValidator = require('../validations/consultValidator');
const postulationValidator = require('../validations/postulationValidator');
const cvFileValidator = require('../validations/cvFileValidator');
const uploadCv = require('../utils/uploadCv')

/* Home */
router.get('/', home);
/* postulacion */
router.post('/cv', uploadCv.any(), cvFileValidator, postulationValidator, cvProcess)
/* Budgets and services */
router.get('/abonos-servicios', services);
/* Consulta */
router.post('/consult', consultValidator, consult);
/* ingresar */
router.get('/ingresar', sessionCheck, login);
router.post('/ingresar', loginValidator, loginProcess);
router.get('/logout', logout);

module.exports = router;