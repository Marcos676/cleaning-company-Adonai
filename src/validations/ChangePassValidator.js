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

  body("newPass")
    .custom((value, { req }) => {
      if (
        (value.length >= 6 && value.length <= 32) ||
        (req.body.pass.length === 0 && value.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("La contraseña debe tener entre 6 y 36 caracteres"),

    body('newPass').custom((value) => {
        let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;; 
        if (regExPass.test(value) || (value === "")) {
            return true
        } else {
            return false
        }
    }).withMessage('Debe tener numeros, letras minúsculas, mayúsculas y caracteres especiales'),

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
