window.addEventListener('load', () => {

console.log('Vinculación de validaciones exitosa!');

const qs = (element) => document.querySelector(element)

/* Expresiones regulares */

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;


let regExExt = /(.docx|.pdf)$/i;

let regExTel = /[^0-9]/

const oneMB = 1048576;


/* VALIDACIONES DE CV */

let formCv= qs('.cv-form') 

let fullNameCv = formCv.elements[0];
let telCv = formCv.elements[1];
let districtCv = formCv.elements[2];
let emailCv = formCv.elements[3];
let messageCv = formCv.elements[4];
let fileCv = formCv.elements[5];


/* validaciónes de nombre y apellido */
fullNameCv.addEventListener('blur', (e) => {
    var cvArrayName = fullNameCv.value.split(" ")

    switch (true) {
        case (fullNameCv.value):
            qs('.error-fullName').innerHTML = 'Se requiere su nombre y apellido';
            fullNameCv.classList.add('is-invalid');
            break;

            case (cvArrayName.length == 1):
            qs('.error-fullName').innerHTML = 'Se requiere su nombre y apellido';
            fullNameCv.classList.add('is-invalid');
            break;

        case (cvArrayName[0].length <= 2) || (cvArrayName[1].length <= 2):
            qs('.error-fullName').innerHTML = 'El nombre y apellido deben tener más de 2 caracteres';
            fullNameCv.classList.add('is-invalid');
            break;

        default:
            qs('.error-fullName').innerHTML = '';
            fullNameCv.classList.remove('is-invalid');
            fullNameCv.classList.add('is-valid');
            break;
    }
})


 /* Validacion de tel */
 telCv.addEventListener('blur', (e) => {

    switch (true) {

        case regExTel.test(telCv.value):
            qs('.errorTel').innerHTML = 'El teléfono no debe contener símbolos, letras o espacios';
            telCv.classList.add('is-invalid');
            break;

        case (telCv.value.length < 8):
            qs('.errorTel').innerHTML = 'El teléfono debe tener al menos 8 dígitos';
            telCv.classList.add('is-invalid');
            break;

        default:
            qs('.errorTel').innerHTML = '';
            telCv.classList.remove('is-invalid');
            telCv.classList.add('is-valid');
            break;
    }
})

/* Validaciones de localidad */
districtCv.addEventListener('blur', () => {

    switch (true) {
        case districtCv.value.length === 0 :
            qs('.error-district').innerHTML = 'Se requiere su localidad de residencia';
            districtCv.classList.add('is-invalid');
            break;
    
        default:
            qs('.error-district').innerHTML = '';
            districtCv.classList.remove('is-invalid');
            districtCv.classList.add('is-valid');
            break;
    }
})

/* Validaciones de email */
emailCv.addEventListener('blur', () => {

    switch (true) {
        case emailCv.value.length === 0:
            qs('.error-email').innerHTML = 'Se requiere el email';
            emailCv.classList.add('is-invalid');
            break;

        case !regExEmail.test(emailCv.value):
            qs('.error').innerHTML = 'El email no es válido';
            emailCv.classList.add('is-invalid');
            break;

        default:
            qs('.error-email').innerHTML = '';
            emailCv.classList.remove('is-invalid');
            emailCv.classList.add('is-valid');
            break;
    }
})


/* Validaciones de mensaje */
messageCv.addEventListener('blur', () => {

    messageCv.classList.add('is-valid')
    
})


/* validación de extensión de archivo */
fileCv.addEventListener('change', (e) => {
    switch (true) {
        case !regExExt.test(fileCv.value):
            qs('.errorFile').innerHTML = 'Solo archivos: Word y PDF';
            fileCv.classList.add('is-invalid')
            break;

        case fileCv.files[0].size > oneMB * 10:
            qs('.errorFile').innerHTML = "El archivo debe pesar menos de 10Mb"
            fileCv.classList.add('is-invalid')
            break;

        default:
            qs('.errorFile').innerHTML = '';
            fileCv.classList.remove('is-invalid')
            fileCv.classList.add('is-valid')
            break;
    }
})


/* Condición para la ejecución de submit en CV */
formCv.addEventListener('submit', (e) => {
    e.preventDefault() 
    if( 
        !fullNameCv.classList.contains('is-valid') ||
        !telCv.classList.contains('is-valid') || !districtCv.classList.contains('is-valid') || !emailCv.classList.contains('is-valid') || !messageCv.classList.contains('is-valid') || !fileCv.classList.contains('is-valid')
    ) {
        !fullNameCv.classList.contains('is-valid') ? fullNameCv.classList.add('is-invalid') : null;
        !telCv.classList.contains('is-valid') ? telCv.classList.add('is-invalid') : null;
        !districtCv.classList.contains('is-valid') ? districtCv.classList.add('is-invalid') : null;
        !emailCv.classList.contains('is-valid') ? emailCv.classList.add('is-invalid') : null;
        !messageCv.classList.contains('is-valid') ? messageCv.classList.add('is-valid') : null;
        !fileCv.classList.contains('is-valid') ? fileCv.classList.add('is-invalid') : null;

        qs('.error').innerHTML = "Complete los campos en rojo"


        swal("Aviso", "Revise los campos incorrectos.", "warning");
    }
    if( 
        fullNameCv.classList.contains('is-valid') &&
        telCv.classList.contains('is-valid') && districtCv.classList.contains('is-valid') && emailCv.classList.contains('is-valid') && messageCv.classList.contains('is-valid') && fileCv.classList.contains('is-valid')
    ) {
        swal("Procesando", `Espere por favor, luego vea el estado de su solicitud en el formulario`, "info");

        formCv.submit()
    }
})

})