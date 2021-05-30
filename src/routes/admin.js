var express = require('express');
var router = express.Router();
const { show, create, edit, passChange } = require('../controllers/adminController');

/* show budgets */
router.get('/presupuestos', show);
/* Create budget */
router.get('/crear-presupuesto', create);
/* Edit budget */
router.get('/editar-presupuesto', edit);
/* Change password */
router.get('/cambiar-contrasenia', passChange);

module.exports = router;
