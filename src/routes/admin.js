var express = require('express');
var router = express.Router();
const { show, create, edit, passChange, passChangeProcess, createProcess, editProcess, budgetDelete } = require('../controllers/adminController');

const adminCheck = require('../middlewares/adminCheck');
const changePassValidator = require('../validations/changePassValidator');
const budgetValidator = require('../validations/budgetValidator');

/* show budgets */
router.get('/presupuestos', adminCheck, show);
/* Create budget */
router.get('/crear-presupuesto', adminCheck, create);
router.post('/crear-presupuesto', budgetValidator, createProcess);
/* Edit budget */
router.get('/editar-presupuesto/:id', adminCheck, edit);
router.put('/editar-presupuesto/:id', budgetValidator, editProcess);
/* Delete budget */
router.delete('/presupuestos/:id', budgetDelete);
/* Change password */
router.get('/cambiar-contrasenia', adminCheck, passChange);
router.put('/cambiar-contrasenia', changePassValidator, passChangeProcess)


module.exports = router;