window.addEventListener("load", () => {
  console.log("Vinculación de validaciones exitosa!");

  const qs = (element) => document.querySelector(element);

  /* Expresiónes regulares */
  let regExPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{6,32}$/;

    let formPass = qs('.form-pass')

    let [pass, newPass, repeatPass] = formPass.elements

    /* Validacion de contraseña actual */
    pass.addEventListener('blur', () => {

        switch (true) {
            case (pass.value.length === 0):
                qs('.errorPass').innerHTML = 'Se requiere la contraseña actual';
                pass.classList.add('is-invalid');
                break;

            case ((pass.value === "") && (newPass.value.length > 0)):
                qs('.errorPass').innerHTML = 'Para cambiar la contraseña, complete los 3 campos requeridos';
                pass.classList.add('is-invalid');
                break;

            default:
                qs('.errorPass').innerHTML = '';
                newPass.classList.remove('is-invalid');
                pass.classList.add('is-valid');
                break;
        }
    })


    /* Validacion de Nueva contraseña */
    newPass.addEventListener('blur', () => {

        switch (true) {
            case (newPass.value === ""):
                qs('.errorNewPass').innerHTML = 'Se requiere la nueva contraseña';
                newPass.classList.add('is-invalid');
                break;

            case (newPass.value !== 0) && (!regExPass.test(newPass.value) && (pass.value !== "")):
                qs('.errorNewPass').innerHTML = 'Debe tener números, letras minúsculas, mayúsculas, caracteres especiales y entre 6 y 36 caracteres';
                newPass.classList.add('is-invalid');
                break;

            default:
                qs('.errorNewPass').innerHTML = '';
                newPass.classList.remove('is-invalid');
                newPass.classList.add('is-valid');
                pass.classList.add('is-valid');
                break;
        }
    })

    /* Validación de confirmación de nueva contraseña */
    repeatPass.addEventListener('blur', () => {

        switch (true) {
            case (repeatPass.value === ""):
                qs('.errorRepeatPass').innerHTML = 'Se requiere la confirmación de la nueva contraseña';
                repeatPass.classList.add('is-invalid');
                break;

            case (newPass.value !== "") && (repeatPass.value !== "") && (newPass.value !== repeatPass.value):
                qs('.errorRepeatPass').innerHTML = 'Las contraseñas no coinciden';
                repeatPass.classList.add('is-invalid');
                break;

            default:
                qs('.errorRepeatPass').innerHTML = '';
                repeatPass.classList.remove('is-invalid');
                repeatPass.classList.add('is-valid');
                break;
        }
    })

    /* Validación para submit */
    formPass.addEventListener('submit', (e) => {
        e.preventDefault()
        if (
            !pass.classList.contains('is-invalid') &&
            !newPass.classList.contains('is-invalid') &&
            !repeatPass.classList.contains('is-invalid')
        ) {
            swal("Enhorabuena!",  `La contraseña se cambio exitosamente! `, "success");
            formPass.submit()
        }
    })

});
