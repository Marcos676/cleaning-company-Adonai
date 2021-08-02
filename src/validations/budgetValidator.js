const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Se requiere el nombre'),
    check('price')
        .notEmpty().withMessage('Se requiere el precio'),
    check('week')
        .notEmpty().withMessage('Este campo es obligatorio'),
    check('hours')
        .notEmpty().withMessage('Las horas son obligatorias')
]