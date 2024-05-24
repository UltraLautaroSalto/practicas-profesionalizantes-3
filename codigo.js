const button_listar = document.getElementById("button_listar");
const button_crear = document.getElementById("button_crear");
const button_editar = document.getElementById("button_editar");
const button_eliminar = document.getElementById("button_eliminar");

// Función para obtener el próximo ID creciente
function obtenerProximoId() {
    // Recuperar el valor actual del ID del almacenamiento local o inicializarlo a 0 si no existe
    var idActual = localStorage.getItem("idActual");
    if (idActual === null) {
      idActual = 0;
    } else {
      idActual = parseInt(idActual);
    }
    
    // Incrementar el ID y guardarlo de nuevo en el almacenamiento local
  var nuevoId = idActual + 1;
  localStorage.setItem("idActual", nuevoId);

  return nuevoId;
}
  
  // Evento click para el botón de guardar datos
  button_crear.addEventListener("click", () => {
    // Solicitar el Nombre y Numero a ingresar mediante un prompt
    var nombre = prompt("Ingrese UserName(Apellido y Nombre sin Espacios)");
    var numeroStr = prompt("Ingrese Numero(Sin Espacios)");
  
    // Convertir el valor del teléfono a entero
    var numero = parseInt(numeroStr);
  
    // Verificar si se ingresaron ambos datos y si el teléfono es un número válido
    if (nombre !== null && nombre !== "" && !isNaN(numero)) {
      // Generar IDs únicos para cada dato
      var id = obtenerProximoId();
  
      // Crear objetos con el dato y su ID
      var obj = { id: id, nombre: nombre, numero: numero};
  
      // Recuperar arrays existentes de localStorage o inicializarlos si no existen
      var arrayInfo = JSON.parse(localStorage.getItem("arrayInfo")) || [];
  
      // Agregar los nuevos datos a los arrays
      arrayInfo.push(obj);
  
      // Guardar los arrays actualizados en localStorage
      localStorage.setItem("arrayInfo", JSON.stringify(arrayInfo));

      agregarFilaATabla(obj);
  
      // Informar al usuario que los datos fueron guardados
      alert("UserName y Numero guardados con Éxito.");
    } else {
      // Informar al usuario que debe de ingresar ambos datos
      alert("No se ingresó ningún valor válido, por favor inténtelo de nuevo.");
    }
  });
  
  // Función para agregar una fila a la tabla con los datos guardados
  function agregarFilaATabla(obj) {
    var tabla = document.getElementById("datosTabla").getElementsByTagName("tbody")[0];
    var nuevaFila = tabla.insertRow();

    var celdaId = nuevaFila.insertCell(0);
    var celdaNombre = nuevaFila.insertCell(1);
    var celdaNumero = nuevaFila.insertCell(2);

    celdaId.innerHTML = obj.id;
    celdaNombre.innerHTML = obj.nombre;
    celdaNumero.innerHTML = obj.numero;
}

  button_listar.addEventListener("click", () => {
    cargarDatos();
  });

  button_editar.addEventListener("click", () => {
    //Prompt que le pide al usuario la informacion de la cuenta original
    var searchIDStr = prompt("Introdusca el ID del Usuario a Modificar")

    // Convertir el valor del nuevo teléfono a entero
    var searchID = parseInt(searchIDStr);

    // Verificar si se ingresaron ambos datos y si el nuevo teléfono es un número válido
    if (!isNaN(searchID)) {
    // Recuperar array existente de localStorage
    var arrayInfo = JSON.parse(localStorage.getItem("arrayInfo")) || [];

    // Bandera para saber si se encontró el nombre
    var IDEncontrado = false;

    // Bucle en el que busca la informacion en el array hasta que coincida
    for(var i = 0; i < arrayInfo.length; i++) {
      if(arrayInfo[i].id === searchID){
        var legacyNombre = arrayInfo[i].nombre;
        var legacyNumero = arrayInfo[i].numero;

        var nuevoNombre = prompt("Introdusca el Nuevo Nombre");
        var nuevoNumero = prompt("Introdusca el Nuevo Numero");

        arrayInfo[i].nombre = nuevoNombre;
        arrayInfo[i].numero = nuevoNumero;

        IDEncontrado = true;

        console.log("Nombre Viejo: " + legacyNombre + " Numero viejo: " + legacyNumero);
        console.log("Nombre Nuevo: " + nuevoNombre + " Numero Nuevo: " + nuevoNumero);
        }

          // Verificar si se encontró el nombre y se modificó el número
          if (IDEncontrado) {
            // Guardar el array actualizado en localStorage
            localStorage.setItem("arrayInfo", JSON.stringify(arrayInfo));
      
            // Recargar la tabla en el HTML
            recargarTabla();
      
            // Informar al usuario que el número fue actualizado
            alert("Número actualizado con éxito.");
            break
          } else{
            // Informar al usuario que el nombre no fue encontrado
            alert("Informacion no encontrada.");
          }
      }
    } else {
      alert("No se a Ingresado ningun valor");
    }
});

button_eliminar.addEventListener("click", () => {
  // Solicita el ID del usuario que desea eliminar
  var searhIDStr = prompt("Ingrese el ID del Usuario que desea eliminar");

  // Combierte el ID Ingresado anteriormente en un Entero
  var searchID = parseInt(searhIDStr);

  // Se asegura que se haya ingresado el ID
  if(!isNaN(searchID)){
  
  // Recuperar array existente de localStorage
  var arrayInfo = JSON.parse(localStorage.getItem("arrayInfo")) || [];

  // Bandera para confirmar que se cambio la informacion
  var IDEncontrado = false;

  // Bucle en el cual se busca la informacion y se cambia por la siguiente en la lista
  for(var i = 0; i < arrayInfo.length; i++){
    if(arrayInfo[i].id === searchID){
      console.log("Nombre y Numero del Usuario Eliminado: " + arrayInfo[i].nombre + " " + arrayInfo[i].numero);
      // Con "splice" elimina los datos del ID introducido
      arrayInfo.splice(i,1);
      // Cambiamos la bandera para que se sepa que se encontro y cambio el dato
      IDEncontrado = true;
      // Rompe la Secuencia y directamente pasa al final
      break;
    }
  }
  // Si el ID es encontrado, entonces lo almacena en el local Storage y llama a la funcion "RecargarTabla" para que muestre la informacion actualizada
  if(IDEncontrado){
    localStorage.setItem("arrayInfo", JSON.stringify(arrayInfo));
    recargarTabla();
    alert("Se a Eliminado el Nombre con Exito");
  }else{
    alert("ID No encontrado");
  }
  } else {
    // En Caso de que no se ingrese ningun valor
    alert("No se a Ingresado Ningun Valor");
  }
});

// Función para recargar la tabla con los datos actualizados
function recargarTabla() {
  // Limpiar la tabla existente
  var tabla = document.getElementById("datosTabla").getElementsByTagName("tbody")[0];
  tabla.innerHTML = "";

  // Volver a cargar los datos en la tabla
  cargarDatos();
}

// Función para cargar y mostrar los datos guardados (opcional)
function cargarDatos() {
  // Recuperar los arrays del almacenamiento local
  var arrayInfo = JSON.parse(localStorage.getItem("arrayInfo")) || [];

  // Agregar cada objeto del arrat a la tabla
  arrayInfo.forEach(obj => {
      agregarFilaATabla(obj);
  });
}