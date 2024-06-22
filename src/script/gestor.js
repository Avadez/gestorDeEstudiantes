// herramienta de gestor de estudiantes
const gesEst = {
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
  agregarNota: (array, id, calificacion) => {
    let x = 0;
    for (x; x < array.length; x++) {
      if (array[x].id == id) {
        array[x].calificaciones.calif.push(calificacion);
      }
    }
  },
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
