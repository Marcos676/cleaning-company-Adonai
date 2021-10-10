window.addEventListener('load', () => {

    console.log('Vinculación de validaciones exitosa!');

    const qs = (element) => document.querySelector(element)

    /* Expresiónes regulares */
    
    /* es email */
    //let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    /* VALIDACIONES DE LOGIN */

    let formLogin = qs('.form-login') 

    let emailLogin = formLogin.elements[0];
    let passLogin = formLogin.elements[1];


    /* Validaciones de email */
    emailLogin.addEventListener('blur', () => {

        switch (true) {
            case emailLogin.value.length === 0:
                qs('.errorLoginEmail').innerHTML = 'Se requiere el email';
                emailLogin.classList.add('is-invalid');
                break;

            // case !regExEmail.test(emailLogin.value):
            //     qs('.errorLoginEmail').innerHTML = 'El email no es válido';
            //     emailLogin.classList.add('is-invalid');
            //     break;

            default:
                qs('.errorLoginEmail').innerHTML = '';
                emailLogin.classList.remove('is-invalid');
                emailLogin.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones Password */
    passLogin.addEventListener('blur', () => {

        switch (true) {
            case passLogin.value.length === 0:
                qs('.errorLoginPass').innerHTML = 'Se requiere la contraseña';
                passLogin.classList.add('is-invalid');
                break;

            default:
                qs('.errorLoginPass').innerHTML = '';
                passLogin.classList.remove('is-invalid');
                passLogin.classList.add('is-valid');
                break;
        }
    })

    /* Condición para la ejecución de submit en Login */
    // formLogin.addEventListener('submit', (e) => {
    //     e.preventDefault() 
    //     if( 
    //         !emailLogin.classList.contains('is-valid') ||
    //         !passLogin.classList.contains('is-valid')
    //     ) {
    //         swal("Aviso", "Revise los campos incorrectos.", "warning");
    //     }
    //     if( 
    //         emailLogin.classList.contains('is-valid') &&
    //         passLogin.classList.contains('is-valid')
    //     ) {
    //         formLogin.submit()
    //     }
    // })
})

