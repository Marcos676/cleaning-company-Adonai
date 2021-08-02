window.addEventListener("load", () => {
  console.log("Vinculación de validaciones exitosa!");

  const qs = (element) => document.querySelector(element);

  /* Expresiones regulares */

  let regExEmail =
    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  let regExTel = /[^0-9]/;

  /* VALIDACIONES DE CV */

  let formConsult = qs(".form-consultation");

  let fullName = formConsult.elements[0];
  let tel = formConsult.elements[1];
  let email = formConsult.elements[2];
  let message = formConsult.elements[3];

  /* validaciónes de nombre y apellido */
  fullName.addEventListener("blur", (e) => {
    var cvArrayName = fullName.value.split(" ");

    switch (true) {
      case fullName.value:
        qs(".error-fullName").innerHTML = "Se requiere su nombre y apellido";
        fullName.classList.add("is-invalid");
        break;

      case cvArrayName.length == 1:
        qs(".error-fullName").innerHTML = "Se requiere su nombre y apellido";
        fullName.classList.add("is-invalid");
        break;

      case cvArrayName[0].length <= 2 || cvArrayName[1].length <= 2:
        qs(".error-fullName").innerHTML =
          "El nombre y apellido deben tener más de 2 caracteres";
        fullName.classList.add("is-invalid");
        break;

      default:
        qs(".error-fullName").innerHTML = "";
        fullName.classList.remove("is-invalid");
        fullName.classList.add("is-valid");
        break;
    }
  });

  /* Validacion de tel */
  tel.addEventListener("blur", (e) => {
    switch (true) {
      case regExTel.test(tel.value):
        qs(".errorTel").innerHTML =
          "El teléfono no debe contener símbolos, letras o espacios";
        tel.classList.add("is-invalid");
        break;

      case tel.value.length < 8:
        qs(".errorTel").innerHTML = "El teléfono debe tener al menos 8 dígitos";
        tel.classList.add("is-invalid");
        break;

      default:
        qs(".errorTel").innerHTML = "";
        tel.classList.remove("is-invalid");
        tel.classList.add("is-valid");
        break;
    }
  });


  /* Validaciones de email */
  email.addEventListener("blur", () => {
    switch (true) {
      case email.value.length === 0:
        qs(".error-email").innerHTML = "Se requiere el email";
        email.classList.add("is-invalid");
        break;

      case !regExEmail.test(email.value):
        qs(".error").innerHTML = "El email no es válido";
        email.classList.add("is-invalid");
        break;

      default:
        qs(".error-email").innerHTML = "";
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        break;
    }
  });

  /* Validaciones de mensaje */
  message.addEventListener("blur", () => {
    switch (true) {
      case message.value.length === 0:
        qs(".error-message").innerHTML = "Por favor dejenos su consulta";
        message.classList.add("is-invalid");
        break;

      default:
        qs(".error-message").innerHTML = "";
        message.classList.remove("is-invalid");
        message.classList.add("is-valid");
        break;
    }
    message.classList.add("is-valid");
  });

  /* Condición para la ejecución de submit en CV */
  formConsult.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      !fullName.classList.contains("is-valid") ||
      !tel.classList.contains("is-valid") ||
      !email.classList.contains("is-valid") ||
      !message.classList.contains("is-valid")
    ) {
      !fullName.classList.contains("is-valid")
        ? fullName.classList.add("is-invalid")
        : null;
      !tel.classList.contains("is-valid")
        ? tel.classList.add("is-invalid")
        : null;
      !email.classList.contains("is-valid")
        ? email.classList.add("is-invalid")
        : null;
      !message.classList.contains("is-valid")
        ? message.classList.add("is-invalid")
        : null;

      qs(".error").innerHTML = "Complete todos los campos";

      swal("Aviso", "Revise los campos incorrectos.", "warning");
    }
    if (
      fullName.classList.contains("is-valid") &&
      tel.classList.contains("is-valid") &&
      email.classList.contains("is-valid") &&
      message.classList.contains("is-valid")
    ) {
      swal("Procesando", `Espere por favor`, "info");

      formConsult.submit();
    }
  });
});
