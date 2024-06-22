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

document.addEventListener("DOMContentLoaded", () => {
  // formulario de creacion de estudiante
  const desplegarCreacion = $("desplegarCreacion");
  const formulario = $("formulario");
  const updateList = $("updateList");
  const tablaDeAlumnos = $("tablaDeAlumnos");
  const agregarNota = $("agregarNota");
  const agregarAnotacion = $("agregarAnotacion");
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
    <th class="encabezadoDeTabla">ID</th>
    <th class="encabezadoDeTabla">Nombre</th>
    <th class="encabezadoDeTabla">Segundo Nombre</th>
    <th class="encabezadoDeTabla">Apellido</th>
    <th class="encabezadoDeTabla">Segundo Apellido</th>
    <th class="encabezadoDeTabla">Estado</th>
    <th class="encabezadoDeTabla">Anotaciones</th>
  </tr>
  `;
    let statusButons = [];
    //sip, esto es spanglish
    let anotacionesButtons = [];
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
          <th id="anotaciones${alumnos[index].id}">${
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

    /*
      guardo cada boton de la tabla alumnado en objeto 
      dentro del array anotacionesButtons, para que? pues ya veran, pero 
      hace falta para mejor identificacion de cada boton
    */
    for (let index = 0; index < alumnos.length; index++) {
      let a = {
        id: index,
        element: $(`anotaciones${alumnos[index].id}`),
      };
      anotacionesButtons.push(a);
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
          gesEst.agregarNota(
            alumnos,
            student.id,
            parseFloat(entradaNota.value)
          );
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

    // formulario de anotaciones
    for (let a = 0; a < anotacionesButtons.length; a++) {
      anotacionesButtons[a].element.addEventListener("click", () => {
        let student = buscadorPorId(anotacionesButtons[a].id);

        let formAnotacion = [
          `
          <label for="tipoDeAnotacion">Que tipo de anotacion desea agregar a <!--inserte nombre-->?</label>
          <select name="tipoDeAnotacion" id="entradaAnotacion${student.id}">
            <option value="anotacion" selected>anotacion</option>
            <option value="positiva">Positiva</option>
            <option value="negativa">Negativa</option>
          </select>
          <input type="button" value="mostrar anotaciones" id="mosAnot${student.id}">
          <input type="button" value="Cancelar anotacion" id="cancelarAnot${student.id}">
          <div id="dispensarAnot${student.id}"></div>
        `,
          {
            positiva: `<p><b class="condecoracion">A que se debe la condecoracion?</b></p>
        <textarea
          placeholder="el alumno ${student.nombre} a realizado tal acto de condecoracion"
          id="textoCondeco${student.id}"
          class="textoCond"
          maxlength="370"
        ></textarea
        ><br />
        <input type="button" value="Cancelar anotacion" id="cancelarAnot${student.id}">
        <input type="button" value="Aplicar Anotacion" id="aplicarCondeco${student.id}" />`,
            negativa: `
            <p><b class="reporteDePataneria">A que se debe el reporte al alumno ${student.nombre}?</b></p>
        <textarea
          placeholder="el alumno a realizado una accion que se sansiona con una anotacion negativa"
          id="textoSansion${student.id}"
          class="textoSans"
          maxlength="370"
        ></textarea
        ><br />
        <input type="button" value="Cancelar anotacion" id="cancelarAnot${student.id}">
        <input type="button" value="Aplicar Anotacion" id="aplicarReporte${student.id}" />
        `,
          },
        ];
        agregarAnotacion.innerHTML = formAnotacion[0];

        let entradaAnot = $(`entradaAnotacion${student.id}`);
        let cancelar = $(`cancelarAnot${student.id}`);
        let mosAnotaciones = $(`mosAnot${student.id}`);
        let dispensarAnots = $(`dispensarAnot${student.id}`);
        let Anots = ``;

        mosAnotaciones.addEventListener("click", () => {
          for (
            let index = 0;
            index < student.anotaciones.positivas.length;
            index++
          ) {
            Anots += `
        <p>
          <b class="numeroDeEntradaPositiva"
            >Anotacion Positiva numero
            ${index + 1}:</b
          >
        </p>
        <p class="contenidoDeLaEntradaPositiva">${
          alumnos[student.id].anotaciones.positivas[index]
        }</p>
        `;
          }
          for (
            let index = 0;
            index < student.anotaciones.negativas.length;
            index++
          ) {
            Anots += `
        <p>
          <b class="numeroDeEntradaNegativa"
            >Anotacion Negativa numero
            ${index + 1}:</b
          >
        </p>
        <p class="contenidoDeLaEntradaNegativa">${
          alumnos[student.id].anotaciones.negativas[index]
        }</p>
        `;
            console.log(alumnos[student.id].anotaciones.positivas[index]);
          }
          console.log(alumnos[student.id].anotaciones.positivas[0]);
          dispensarAnots.innerHTML = Anots;
        });

        cancelar.addEventListener("click", () => {
          agregarAnotacion.innerHTML = "";
        });
        entradaAnot.addEventListener("change", () => {
          if (entradaAnot.value == "positiva") {
            agregarAnotacion.innerHTML = formAnotacion[1].positiva;
            cancelar = $(`cancelarAnot${student.id}`);
            let anotTextArea = $(`textoCondeco${student.id}`);
            let anotButon = $(`aplicarCondeco${student.id}`);
            anotButon.addEventListener("click", () => {
              gesEst.anadirAnotacion(
                alumnos,
                student.id,
                anotTextArea.value,
                "positiva"
              );
              agregarAnotacion.innerText = "";
            });
            cancelar.addEventListener("click", () => {
              agregarAnotacion.innerHTML = "";
            });
          }
          if (entradaAnot.value == "negativa") {
            agregarAnotacion.innerHTML = formAnotacion[1].negativa;
            cancelar = $(`cancelarAnot${student.id}`);
            let anotTextArea = $(`textoSansion${student.id}`);
            let anotButon = $(`aplicarReporte${student.id}`);

            anotButon.addEventListener("click", () => {
              console.log();
              gesEst.anadirAnotacion(
                alumnos,
                student.id,
                anotTextArea.value,
                "negativa"
              );
              agregarAnotacion.innerText = "";
            });
            cancelar.addEventListener("click", () => {
              agregarAnotacion.innerHTML = "";
            });
          }
        });
      });
    }
    //fin del codigo de formulario de anotaciones

    /*
      creando modificador de color para estado del aprobado con buenas notas, 
      aprobado con notas decentes y re-probados
    */
    for (let index = 0; index < statusButons.length; index++) {
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
          statusButons[index].element.style.backgroundColor =
            colorPrede.default;
        });
        statusButons[index].element.addEventListener("mouseleave", () => {
          statusButons[index].element.style.backgroundColor =
            colorPrede.negativo;
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
          statusButons[index].element.style.backgroundColor =
            colorPrede.default;
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
          statusButons[index].element.style.backgroundColor =
            colorPrede.default;
        });
        statusButons[index].element.addEventListener("mouseleave", () => {
          statusButons[index].element.style.backgroundColor =
            colorPrede.positivo;
        });
      }
    }
    for (let p = 0; p < anotacionesButtons.length; p++) {
      let tempObj = {
        positivas: buscadorPorId(anotacionesButtons[p].id).anotaciones.positivas
          .length,
        negativas: buscadorPorId(anotacionesButtons[p].id).anotaciones.negativas
          .length,
      };
      if (tempObj.positivas > tempObj.negativas) {
        //
        anotacionesButtons[p].element.style.backgroundColor =
          "rgb(42, 128, 67)";
      }
      if (tempObj.positivas < tempObj.negativas) {
        //
        anotacionesButtons[p].element.style.backgroundColor =
          "rgb(179, 26, 26)";
      }
      if (tempObj.positivas == tempObj.negativas) {
        //
        anotacionesButtons[p].element.style.backgroundColor =
          "rgb(143, 89, 46)";
      }
    }
  });

  /*
    aqui esta el boton que ayuda a la funcion 
    desplegar, el desplegar el formulario
  */
  desplegarCreacion.addEventListener("click", desplegar);
});
