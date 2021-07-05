var express = require('express');
var router = express.Router();
const { show, create, edit, passChange } = require('../controllers/adminController');

const adminCheck = require('../middlewares/adminCheck');

/* show budgets */
router.get('/presupuestos', adminCheck, show);
/* Create budget */
router.get('/crear-presupuesto', adminCheck, create);
/* Edit budget */
router.get('/editar-presupuesto', adminCheck, edit);
/* Change password */
router.get('/cambiar-contrasenia', adminCheck, passChange);

module.exports = router;
