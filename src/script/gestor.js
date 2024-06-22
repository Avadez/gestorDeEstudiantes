// herramienta de gestor de estudiantes
const gesEst = {
  /*
  una funcion para crear estudiantes con 
  la clase "Estudiante" y meterlo en el array de preferencia
  */
  creator: (array, nombre, segundoNombre, apellido, segundoApellido) => {
    let id = array.length;
    let estudiante = new Estudiante(
      id,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido
    );
    array.push(estudiante);
  },
  // una funcion para agregar una nota a un estudiantes
  agregarNota: (array, id, calificacion) => {
    let x = 0;
    for (x; x < array.length; x++) {
      if (array[x].id == id) {
        array[x].calificaciones.calif.push(calificacion);
      }
    }
  },
  /*
  esta funcion es para actualizar el promedio y actualizar 
  el estado de un estudiante, si esta aprobado o reprobado
  */
  promediar: (array) => {
    let x = 0;
    for (x; x < array.length; x++) {
      let total = 0;
      for (
        let notaPos = 0;
        notaPos < array[x].calificaciones.calif.length;
        notaPos++
      ) {
        total += array[x].calificaciones.calif[notaPos];
      }
      array[x].calificaciones.promedio =
        total / array[x].calificaciones.calif.length;

      if (array[x].calificaciones.promedio <= 5) {
        array[x].calificaciones.estado = "reprobado";
      }
      if (array[x].calificaciones.promedio >= 5) {
        array[x].calificaciones.estado = "aprobado";
      }
    }
  },
  /*
  ayuda a añadir facilmente una anotacion 
  ya sea positiva o negativa a un estudiante
  */
  anadirAnotacion: (array, id, anotacion, tipo) => {
    let x = 0;
    for (x; x < array.length; x++) {
      if (array[x].id == id) {
        if (tipo == "positiva") {
          array[x].anotaciones.positivas.push(anotacion);
        }
        if (tipo == "negativa") {
          array[x].anotaciones.negativas.push(anotacion);
        }
      }
    }
  },
};

/*
una funcion corriente que me ayuda como programador a 
seleccionar un elemento por su ID
*/
const $ = (id) => {
  return document.getElementById(id);
};
