window.addEventListener('load', () => {
    console.log('Vinculacion de serviceImages exitosa');

    const eId = (element) => document.getElementById(element)

    let boxes = [eId('desinfeccion'), eId('limpieza-de-oficinas'), eId('finales-de-obra'), eId('limpieza-en-escuelas'), eId('servicios-de-hoteleria'), eId('servicios-de-hoteleria-en-hospitales')]

    console.log(boxes);

    let images = ['service-desinfection.png', 'service-crearingOffice.png', 'service-endOfWork.png', 'service-schools.png', 'service-hotel.png', 'service-hospital.png']

    boxes.forEach((box, i) => {
        box.style.backgroundImage = `url(/images/services/${images[i]})`
    });

    })