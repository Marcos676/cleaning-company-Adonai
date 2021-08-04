const { check, body } = require("express-validator");

module.exports = [
  check("fullName").notEmpty().withMessage("El nombre y apellido son obligatorio"),
  body("fullName")
    .custom((value) => {
      let names = value.trim().split(" ");
      if (names.length === 1) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Se requiere su nombre y apellido"),

  body("fullName")
    .custom((value) => {
      let names = value.trim().split(" ");
      if (names[0].length > 2 || names[1].length > 2) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("El nombre y apellido deben tener más de 2 caracter"),

  check("tel").notEmpty().withMessage("El teléfono es obligatorio"),
  body("tel")
    .custom((value) => {
      let tel = value.trim();
      if (tel.length < 8) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("El teléfono debe tener al menos 8 dígitos"),

  check("email").notEmpty().withMessage("El email es obligatorio"),
  check('email')
        .isEmail().withMessage('El email no es válido'),
  
  check("message").notEmpty().withMessage("El mensaje es obligatorio"),
];