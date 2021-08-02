window.addEventListener("load", () => {
  console.log("Vinculación de validación exitosa");

  const qs = (element) => document.querySelector(element);

  let formBudgets = qs(".budget-form");

  let [
    nameBudget,
    priceBudget,
    weekBudget,
    hoursBudget,
    ivaSiBudget,
    ivaNoBudget,
    materialsSiBudget,
    materialsNoBudget,
  ] = formBudgets.elements;

  /* Reflejo en tarjeta */
  window.addEventListener("change", () => {
    let nameMirror = qs(".nameMirror");
    nameMirror.innerHTML = nameBudget.value;

    let priceMirror = qs(".priceMirror");
    priceMirror.innerHTML = `$${priceBudget.value}`;

    let weekMirror = qs(".weekMirror");
    weekMirror.innerHTML = `${weekBudget.value} veces por semana`;

    let hoursMirror = qs(".hoursMirror");
    hoursMirror.innerHTML = `${hoursBudget.value} horas`;

    let ivaMirror = qs(".ivaMirror");
    ivaSiBudget.checked === true ? ivaMirror.innerHTML = `Si incluye IVA` : ivaMirror.innerHTML = `No incluye IVA`

    let materialsMirror = qs(".materialsMirror");
    materialsSiBudget.checked === true ? materialsMirror.innerHTML = `Si incluye materiales` : materialsMirror.innerHTML = `No incluye materiales`
    
  });

  /* Validaciones de nombre */
  nameBudget.addEventListener("blur", () => {
    switch (true) {
      case nameBudget.value === "":
        nameBudget.classList.add("is-invalid");
        qs(".errorName").innerHTML = "Se requiere el nombre";
        break;

      default:
        qs(".errorName").innerHTML = "";
      nameBudget.classList.remove("is-invalid");
      nameBudget.classList.add("is-valid");
        break;
    }
  });

  /* Validaciones de precio */
  priceBudget.addEventListener("blur", () => {
    switch (true) {
      case priceBudget.value === "":
        priceBudget.classList.add("is-invalid");
        qs(".errorPrice").innerHTML = "Se requiere el precio";
        break;

      default:
        qs(".errorPrice").innerHTML = "";
      priceBudget.classList.remove("is-invalid");
      priceBudget.classList.add("is-valid");
        break;
    }
  });

  /* Validaciones de semana */
  weekBudget.addEventListener("blur", () => {
    switch (true) {
      case weekBudget.value === "":
        weekBudget.classList.add("is-invalid");
        qs(".errorWeek").innerHTML = "Se requiere este campo";
        break;

        case weekBudget.value > 7:
        weekBudget.classList.add("is-invalid");
        qs(".errorWeek").innerHTML = "No pueden ser más de 7 veces por semana";
        break;

      default:
        qs(".errorWeek").innerHTML = "";
      weekBudget.classList.remove("is-invalid");
      weekBudget.classList.add("is-valid");
        break;
    }
  });

  /* Validaciones de horas */
  hoursBudget.addEventListener("blur", () => {
    switch (true) {
      case hoursBudget.value === "":
        hoursBudget.classList.add("is-invalid");
        qs(".errorHours").innerHTML = "Se requiere las horas";
        break;

        case hoursBudget.value > 24:
        hoursBudget.classList.add("is-invalid");
        qs(".errorHours").innerHTML = "No pueden ser más de 24 horas por día";
        break;

      default:
        qs(".errorHours").innerHTML = "";
      hoursBudget.classList.remove("is-invalid");
      hoursBudget.classList.add("is-valid");
        break;
    }
  });


  formBudgets.addEventListener('submit', (e) => {
    e.preventDefault() 
    if( 
        !nameBudget.classList.contains('is-valid') || !priceBudget.classList.contains('is-valid') || !weekBudget.classList.contains('is-valid') || !hoursBudget.classList.contains('is-valid')
    ) {
        !nameBudget.classList.contains('is-valid') ? priceBudget.classList.add('is-invalid') : null;
        !weekBudget.classList.contains('is-valid') ? hoursBudget.classList.add('is-invalid') : null;


        swal("Aviso", "Revise los campos incorrectos", "warning");
    }
    if( 
        nameBudget.classList.contains('is-valid') ||
        priceBudget.classList.contains('is-valid') || weekBudget.classList.contains('is-valid') || hoursBudget.classList.contains('is-valid')
    ) {

        
        swal("Exito",  `Creación o edición exitosa `, "success");

        formBudgets.submit()

    }
})


});
