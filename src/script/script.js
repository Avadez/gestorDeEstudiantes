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
let estadoDeDespliegue = "no";
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
  for (let index = 0; index < alumnos.length; index++) {
    tablaDeAlumnado += `
    <tr>
      <th>${alumnos[index].id}</th>
      <th>${alumnos[index].nombre}</th>
      <th>${alumnos[index].segundoNombre}</th>
      <th>${alumnos[index].apellido}</th>
      <th>${alumnos[index].segundoApellido}</th>
      <th>${alumnos[index].calificaciones.estado}</th>
      <th>${
        alumnos[index].anotaciones.positivas.length +
        alumnos[index].anotaciones.negativas.length
      }</th>
    </tr>
    `;
  }
  tablaDeAlumnos.innerHTML = tablaDeAlumnado;
});

desplegarCreacion.addEventListener("click", desplegar);
