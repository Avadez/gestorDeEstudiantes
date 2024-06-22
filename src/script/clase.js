class Estudiante {
  constructor(
    ID = 0,
    nombre = "",
    segundoNombre = "",
    apellido = "",
    segundoApellido = ""
  ) {
    this.id = ID;
    this.nombre = nombre;
    this.segundoNombre = segundoNombre;
    this.apellido = apellido;
    this.segundoApellido = segundoApellido;
    this.calificaciones = {
      calif: [],
      promedio: 0,
      estado: "unknown",
    };
    this.anotaciones = {
      positivas: [],
      negativas: [],
    };
  }
}
