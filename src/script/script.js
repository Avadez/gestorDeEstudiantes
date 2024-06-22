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

// Declaro las funciones que ocupo en el codigo

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
// formulario de creacion de estudiante
const desplegarCreacion = $("desplegarCreacion");
const formulario = $("formulario");
const updateList = $("updateList");
const tablaDeAlumnos = $("tablaDeAlumnos");
const agregarNota = $("agregarNota");
let colorPrede = {
  default: "rgb(53, 132, 156)",
  negativo: "rgb(179, 26, 26)",
  neutro: "rgb(143, 89, 46)",
  positivo: "rgb(42, 128, 67)",
};

// creo la funcion que desplegara el formulario de creacion de alumno
const desplegar = () => {
  if (estadoDeDespliegue == "no") {
    formulario.innerHTML = crearNuevoUsuario;
    let menuDeCreacion = {
      crear: $("crear"),
      nombre: $("nombre"),
      segundoNombre: $("segundoNombre"),
      apellido: $("apellido"),
      segundoApellido: $("segundoApellido"),
    };

    menuDeCreacion.crear.addEventListener("click", () => {
      gesEst.creator(
        alumnos,
        menuDeCreacion.nombre.value,
        menuDeCreacion.segundoNombre.value,
        menuDeCreacion.apellido.value,
        menuDeCreacion.segundoApellido.value
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

//funcion para buscar toda la informacion por medio de un ID
const buscadorPorId = (id) => {
  for (let index = 0; index < alumnos.length; index++) {
    if (alumnos[index].id == id) {
      return alumnos[index];
    }
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
    imprimir en pantalla los alumnos y agrego ID's 
    para manejarlos mas tarde
  */
  for (let index = 0; index < alumnos.length; index++) {
    tablaDeAlumnado += `
    <tr>
      <th>${alumnos[index].id}</th>
      <th>${alumnos[index].nombre}</th>
      <th>${alumnos[index].segundoNombre}</th>
      <th>${alumnos[index].apellido}</th>
      <th>${alumnos[index].segundoApellido}</th>
      <th id="estadoId${alumnos[index].id}" title="Agregar nota a ${
      alumnos[index].nombre
    }?" class="statusButon" >${alumnos[index].calificaciones.estado}</th>
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
      element: $(`estadoId${alumnos[index].id}`),
    };
    statusButons.push(a);
  }

  // creo un sistema de calificaciones
  for (let a = 0; a < statusButons.length; a++) {
    statusButons[a].element.addEventListener("click", () => {
      let student = buscadorPorId(statusButons[a].id);

      let formNota = `
      <p>
          Que nota desea agregar a
          ${student.nombre} ${student.apellido}?
      </p>
      <input type="number" id="calificacion${student.id}" placeholder="1.0-7.0" />
      <input type="button" value="calificar" id="calificar${student.id}"> <br/>
      <input type="button" value="cancelar" id="cancelar${student.id}"> <input type="button" value="mostrar calificaciones" id="mosCalif${student.id}"> <br/>
      <div id="dispensarCalifs${student.id}"></div>
      `;
      agregarNota.innerHTML = formNota;

      let entradaNota = $(`calificacion${student.id}`);
      let calificar = $(`calificar${student.id}`);
      let cancelar = $(`cancelar${student.id}`);
      let mosCalif = $(`mosCalif${student.id}`);
      let dispensarCalifs = $(`dispensarCalifs${student.id}`);
      let califs = ``;

      calificar.addEventListener("click", () => {
        gesEst.agregarNota(alumnos, student.id, parseFloat(entradaNota.value));
        gesEst.promediar(alumnos);
      });
      mosCalif.addEventListener("click", () => {
        for (
          let index = 0;
          index < student.calificaciones.calif.length;
          index++
        ) {
          if (student.calificaciones.calif[index] >= 6) {
            califs += `<span class="calificacionIndiPos">Nota ${index}: ${student.calificaciones.calif[index]},</span>`;
          }
          if (
            student.calificaciones.calif[index] < 6 &&
            student.calificaciones.calif[index] > 4.9
          ) {
            califs += `<span class="calificacionIndiNeu">Nota ${index}: ${student.calificaciones.calif[index]},</span>`;
          }
          if (student.calificaciones.calif[index] < 5) {
            califs += `<span class="calificacionIndiNeg">Nota ${index}: ${student.calificaciones.calif[index]},</span>`;
          }
        }
        dispensarCalifs.innerHTML = califs;
      });
      cancelar.addEventListener("click", () => {
        agregarNota.innerHTML = "";
      });
    });
  }

  /*
    creando modificador de color para estado del aprobado con buenas notas, 
    aprobado con notas decentes y re-probados
  */
  for (let index = 0; statusButons.length; index++) {
    // let student = buscadorPorId(statusButons[index].id);
    /*
    console.log(
      buscadorPorId(statusButons[index].id).calificaciones.promedio < 5
    );
    */

    if (buscadorPorId(statusButons[index].id).calificaciones.promedio < 5) {
      // aqui el bloque de codigo negativo
      //console.log(statusButons[index].element);
      statusButons[index].element.style.backgroundColor = colorPrede.negativo;
      // eventos de manejo de color re-probados
      statusButons[index].element.addEventListener("mouseenter", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.default;
      });
      statusButons[index].element.addEventListener("mouseleave", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.negativo;
      });
    }
    if (
      buscadorPorId(statusButons[index].id).calificaciones.promedio > 4.9 &&
      buscadorPorId(statusButons[index].id).calificaciones.promedio < 6
    ) {
      // aqui el bloque de codigo neutral
      //console.log(statusButons[index].element);
      statusButons[index].element.style.backgroundColor = colorPrede.neutro;
      // eventos de manejo de color aprobados por poco
      statusButons[index].element.addEventListener("mouseenter", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.default;
      });
      statusButons[index].element.addEventListener("mouseleave", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.neutro;
      });
    }
    if (buscadorPorId(statusButons[index].id).calificaciones.promedio > 5.9) {
      // aqui el bloque de codigo positivo
      //console.log(statusButons[index].element);
      statusButons[index].element.style.backgroundColor = colorPrede.positivo;
      // eventos de manejo de color aprobados
      statusButons[index].element.addEventListener("mouseenter", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.default;
      });
      statusButons[index].element.addEventListener("mouseleave", () => {
        statusButons[index].element.style.backgroundColor = colorPrede.positivo;
      });
    }
  }
  console.log(statusButons);
});

/*
  aqui esta el boton que ayuda a la funcion 
  desplegar, el desplegar el formulario
*/
desplegarCreacion.addEventListener("click", desplegar);
