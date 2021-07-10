const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    check('price')
        .notEmpty().withMessage('El precio es obligatorio'),
    check('week')
        .notEmpty().withMessage('Este campo es obligatorio'),
    check('hours')
        .notEmpty().withMessage('Las horas son obligatorias')
]