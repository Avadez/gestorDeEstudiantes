const alumnos = [];
/*

gesEst.creator(alumnos, "pepito", "alexander", "gonzales", "suarez");
gesEst.creator(alumnos, "pedrito", "marcos", "gonzales", "suarez");

// probando anotaciones con alumno id 0
gesEst.agregarNota(alumnos, 0, 7.0);
gesEst.agregarNota(alumnos, 0, 7.2);
gesEst.agregarNota(alumnos, 0, 1.0);
gesEst.agregarNota(alumnos, 0, 2.0);
gesEst.anadirAnotacion(alumnos, 0, "se porto mal", "negativa");
gesEst.anadirAnotacion(alumnos, 0, "se porto bien", "positiva");

// probando anotaciones con id 1
gesEst.agregarNota(alumnos, 0, 7.0);
gesEst.agregarNota(alumnos, 0, 7.2);
gesEst.agregarNota(alumnos, 0, 1.0);
gesEst.agregarNota(alumnos, 0, 2.0);
gesEst.anadirAnotacion(alumnos, 0, "se porto mal", "negativa");
gesEst.anadirAnotacion(alumnos, 0, "se porto bien", "positiva");

gesEst.promediar(alumnos);

console.log(alumnos);
//console.log(alumnos);
*/

// creando alumnos de ejemplo
gesEst.creator(alumnos, "Carlos", "Andrés", "Ramírez", "Vargas");
gesEst.creator(alumnos, "Isabella", "Fernanda", "Silva", "López");
gesEst.creator(alumnos, "Diego", "Alejandro", "Gómez", "Pérez");
gesEst.creator(alumnos, "Valentina", "Camila", "Hernández", "Torres");
gesEst.creator(alumnos, "Mateo", "Sebastián", "Rojas", "Jiménez");
gesEst.creator(alumnos, "Daniela", "Sofía", "Ortega", "García");
gesEst.creator(alumnos, "Javier", "Andrés", "Vega", "Mendoza");
gesEst.creator(alumnos, "Natalia", "María", "Castro", "Ruiz");

// terminando de crear alumnos de ejemplo

//Declaro las funciones que ocupo en el codigo

let estadoDeDespliegue = "no";
/*
Guardo el formulario en una variable 
para ponerlo y quitarlo cuando 
sea necesario
*/
const crearNuevoUsuario = `
    <!--se solicita el nombre-->
    <label>Nombre</label>
    <input type="text" placeholder="Nombre" id="nombre" /><br />
    <!--se solicita el segundo nombre-->
    <label>segundo Nombre</label>
    <input type="text" placeholder="segundo Nombre" id="segundoNombre" /><br />
    <!--se solicita el apellido-->
    <label>Apellido</label>
    <input type="text" placeholder="Apellido" id="apellido" /><br />
    <!--se solicita el segundo apellido-->
    <label>segundo Apellido</label>
    <input
      type="text"
      placeholder="segundo Apellido"
      id="segundoApellido"
    /><br />
    <!--se ejecuta la creacion del alumno-->
    <input type="button" value="Crear Estudiante" id="crear" />
    `;
//formulario de creacion de estudiante
const desplegarCreacion = $("desplegarCreacion");
const formulario = $("formulario");
const updateList = $("updateList");
const tablaDeAlumnos = $("tablaDeAlumnos");

//creo la funcion que desplegara el formulario de creacion de alumno
const desplegar = () => {
  if (estadoDeDespliegue == "no") {
    formulario.innerHTML = crearNuevoUsuario;
    let crear = $("crear");
    let nombre = $("nombre");
    let segundoNombre = $("segundoNombre");
    let apellido = $("apellido");
    let segundoApellido = $("segundoApellido");
    crear.addEventListener("click", () => {
      gesEst.creator(
        alumnos,
        nombre.value,
        segundoNombre.value,
        apellido.value,
        segundoApellido.value
      );
      console.log(alumnos);
    });
    estadoDeDespliegue = "si";
    return "se a desplegado";
  }
  if (estadoDeDespliegue == "si") {
    formulario.innerHTML = "";
    estadoDeDespliegue = "no";
    return "ya no esta desplegado";
  }
};

/* 
se que en el siguiente evento estoy abusando del for y que 
es mala practica hacerlo tanto, aqui va el evento updateList que
se encargara de actualizar la lista de estudiantes 
en pantalla con ayuda de un boton
*/
updateList.addEventListener("click", () => {
  let tablaDeAlumnado = `
  <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Segundo Nombre</th>
    <th>Apellido</th>
    <th>Segundo Apellido</th>
    <th>Estado</th>
    <th>Anotaciones</th>
  </tr>
  `;
  let statusButons = [];
  /*
    Rellendo varias filas de una tabla para 
    imprimir en pantalla los alumnos y agrego ID's para manejarlos mas tarde
  */
  for (let index = 0; index < alumnos.length; index++) {
    tablaDeAlumnado += `
    <tr>
      <th>${alumnos[index].id}</th>
      <th>${alumnos[index].nombre}</th>
      <th>${alumnos[index].segundoNombre}</th>
      <th>${alumnos[index].apellido}</th>
      <th>${alumnos[index].segundoApellido}</th>
      <th><input type="button" value="${
        alumnos[index].calificaciones.estado
      }" id="estadoId${alumnos[index].id}" title="Agregar nota a ${
      alumnos[index].nombre
    }?" class="statusButon"></th>
      <th>${
        alumnos[index].anotaciones.positivas.length +
        alumnos[index].anotaciones.negativas.length
      }</th>
    </tr>
    `;
  }
  tablaDeAlumnos.innerHTML = tablaDeAlumnado;

  /*
  guardo cada boton de la tabla alumnado en objeto 
  dentro del array statusButons, para que? pues ya veran, pero 
  hace falta para mejor identificacion de cada boton
  */
  for (let index = 0; index < alumnos.length; index++) {
    let a = {
      id: index,
      elemnt: $(`estadoId${alumnos[index].id}`),
    };
    statusButons.push(a);
  }

  console.log(statusButons);
});

/*
aqui esta el boton que ayuda a la funcion 
desplegar, el desplegar el formulario
*/
desplegarCreacion.addEventListener("click", desplegar);
