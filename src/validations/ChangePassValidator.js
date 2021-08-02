const { body } = require("express-validator");

module.exports = [

  /* newPass */
  body("newPass")
    .custom((value, { req }) => {
      if (req.body.pass.length === 0 && value.length === 0) {
        return true;
      } else {
        if (req.body.pass.length > 0 && value.length > 0) {
          return true;
        }
        return false;
      }
    })
    .withMessage("Complete todos los campos de contraseña"),

    body('newPass').custom((value) => {
        let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{6,32}$/;; 
        if (regExPass.test(value) || (value === "")) {
            return true
        } else {
            return false
        }
    }).withMessage('Debe tener números, letras minúsculas, mayúsculas, caracteres especiales y entre 6 y 36 caracteres'),

  body("repeatPass")
    .custom((value, { req }) => {
      if (value !== req.body.newPass) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Las contraseñas no coinciden"),
];
