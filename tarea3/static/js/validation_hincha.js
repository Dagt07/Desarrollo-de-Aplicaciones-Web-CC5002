//Inspirado en la capsula auxiliar 3 de Raúl

const validateEmail = (email) => {
  if (!email) return false; // verifica si es vacio
  // length  validation
  let lengthValid = email.length < 30;

  // format validation
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // return logic AND of validations.
  return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  //lenght validation
  let lengthValid = phoneNumber.length >= 9;

  // format validation
  let re = /^[0-9]+$/;
  let formatValid = re.test(phoneNumber);

  // return logic AND of validations.
  return lengthValid && formatValid;
};

const validateTransporte = (transporte) => {
  if (!transporte) return false;
  if (transporte == "particular" || transporte == "locomoción pública") return true;

//En verdad el menu selección solo deja elegir 1 en frontend
let selectedvalue = transporte.options[transporte.selectedIndex].value;
if (transporte.multiple == false){ //con esto nos aseguramos que no se modifique el html dejando marcar más de 1 opción
  if (selectedvalue == "particular") return true;
  if (selectedvalue == "locomoción pública") return true;
}
};

const validateNombre = (nombre) => {
if (!nombre) return false;

//length validation
let lengthValid = (nombre.length >=3 && nombre.length <= 80);

//format validation
let re2 = /^[a-zA-Z\s]+$/; //nombre sin y con espacios
let formatValid = re2.test(nombre);
return formatValid && lengthValid;
};

const validateDeportes = (deportes) => {
if (!deportes) return false;

let selectedOptions = Array.from(deportes.selectedOptions);
if (selectedOptions.length >= 1 && selectedOptions.length <= 3) {
    return true; //seleccion valida
} else {
    return false; //seleccion invalida
}
};

const cargaTipo = () =>{
  let select = document.getElementById("alimento");
  let region = select.value;
  
  let selectTipos = document.getElementById("comuna");
  selectTipos.innerHTML = "";
  
  if (region == "Región Arica y Parinacota") {
    (["Arica", "Camarones", "General Lagos", "Putre"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
    
  }else if (region == "Región de Tarapacá") {
    (["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Antofagasta") {
    (["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Atacama") {
    (["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Coquimbo ") {
    (["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", 
    "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Valparaíso") {
    (["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas",
     "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", 
     "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", 
     "San Felipe", "Santa María", "Santo Domingo", "Valparaíspo", "Villa Alemana", "Viña del Mar", "Zapallar"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región Metropolitana de Santiago ") {
    (["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central",
     "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "Lampa", "La Pintana", "La Reina", "Las Condes",
      "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macúl", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda",
       "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo",
        "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región del Libertador Bernardo Ohiggins") {
    (["Chépica", "Chimbarongo", "Codegua", "Coínco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí",
     "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu",
      "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "Santa Cruz", "San Vicente"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región del Maule") {
    (["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule",
     "Molina","Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", 
     "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región del Biobío") {
    (["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida",
     "Hualpén", "Hualqui", "Laja", "Lebu", "Los Alamos", "Los Angeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco",
      "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]
      ).forEach((element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de La Araucanía") {
    (["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro",
     "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón",
      "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Los Ríos") {
    (["Corral", "Futrono", "Lago Ranco", "Lanco", "La Unión", "Los Lagos", "Máfil", "Mariquina",
     "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Los Lagos") {
    (["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú",
     "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas",
      "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región Aisén del General Carlos Ibáñez del Campo") {
    (["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región de Magallanes y la Antártica Chilena") {
    (["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde",
     "San Gregorio", "Timaukel", "Torres del Paine"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }else if (region == "Región del Ñuble") {
    (["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto",
     "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]).forEach(
     (element) => {
      let option = document.createElement("option");
      option.text = element;
      option.value= element;
      selectTipos.add(option);
     });
  }
};

const validateRegion_yComuna = (lugar) => {
if (!lugar) return false;

//En verdad el menu selección solo deja elegir 1 en frontend
let selectedvalue = lugar.options[lugar.selectedIndex].value;
if (lugar.multiple == false && selectedvalue == "seleccione"){ //con esto nos aseguramos que no se modifique el html dejando marcar más de 1 opción
  return true;
}
};

//agregar funciones auxiliares faltantes y cambiar nombre a mis id's
const validateForm = () => {
  // get elements from DOM by using form's name.
  let myForm = document.forms["myForm"];
  // get elements from DOM by using id's.
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("telefono").value;
  let transporte = document.getElementById("transporte");
  let nombre = document.getElementById("nombre").value;
  let deporte = document.getElementById("deporte");

  // validation auxiliary variables and function.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // validation logic
  if(!validateDeportes(deporte)){
    setInvalidInput("Deportes, escoja entre 1 y 3 opciones de deportes listados");
  }
  if(!validateTransporte(transporte)){
    setInvalidInput("Transporte, escoja una opción válida");
  }
  if(!validateNombre(nombre)){
    setInvalidInput("Nombre");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email, no cumple con formato");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Numero de telefono, debe tener 9 digitos sin codigo zona");
  }
  

  // finally display validation
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    // add invalid elements to val-list element.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // set val-msg
    validationMessageElem.innerText = "Los siguiente campos son invalidos:";

    // make validation prompt visible
    validationBox.hidden = false;
  } else {
    validationBox.hidden = true;
    let confirmationBox = document.getElementById("popup-box");
    let confirmationMessageElem = document.getElementById("popup-msg");
    
    confirmationBox.hidden = false;
    confirmationMessageElem.innerText = "¿Confirma el registro de este hincha?";
    //crea botones de confirmar y denegar
    document.getElementById("b1").addEventListener("click", clickgotomenu);
    document.getElementById("b2").addEventListener("click", clickgotoform);
  }
};

clickgotomenu = () => {
  window.location.href = "/";
  let form = document.getElementById("form_hincha");
  form.submit();
};

clickgotoform = () => {
window.location.href = "/agregar-hincha";
};

let submitBtn = document.getElementById("hsubmit-btn");
submitBtn.addEventListener("click", validateForm);
