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

// añadiendoles historial de notas

//gesEst.agregarNota();

const randomNum = () => {
  let rand = Math.ceil(Math.random() * 100);
  return rand;
};
let numeroRandom = [randomNum(), randomNum(), randomNum(), randomNum()];

const notitas = [
  [7, 5, 6.2, 4.6],
  [6, 5.8, 6.2, 5.9],
  [4.5, 7, 4.2, 4.6],
  [7, 5, 6.2, 6.3],
  [5.6, 4.6, 4.2, 5.6],
  [6.6, 6, 5.9, 5.6],
  [4.6, 4.5, 5.2, 3.6],
  [4, 6.5, 4.2, 5.6],
];

const notaciones = {
  positivas: [
    "Participación activa en clase",
    "Ayudó a un compañero con una tarea",
    "Entregó su trabajo a tiempo",
    "Demostró respeto hacia el profesor",
    "Colaboró en un proyecto en equipo",
    "Buena actitud durante la clase",
    "Se esforzó en mejorar su rendimiento",
    "Excelente presentación oral",
    "Cumplió con las normas de la escuela",
    "Ayudó a mantener el orden en el aula",
  ],
  negativas: [
    "Llegó tarde a clase",
    "No hizo la tarea asignada",
    "Hizo trampa en un examen",
    "Discutió con un compañero",
    "No respetó las normas del aula",
    "Faltó a clases sin justificación",
    "No participó en actividades grupales",
    "Usó lenguaje inapropiado",
    "No prestó atención durante la clase",
    "Se mostró desinteresado en el aprendizaje",
  ],
};

for (let index = 0; index < alumnos.length; index++) {
  let numeroRandom = [randomNum(), randomNum(), randomNum(), randomNum()];
  let algoBueno = numeroRandom[0];
  let algoMalo = numeroRandom[1];
  let segundaProbBuena = numeroRandom[2];
  let segundaProbMala = numeroRandom[3];
  for (let p = 0; p < notitas[index].length; p++) {
    gesEst.agregarNota(alumnos, index, notitas[index][p]);
  }
  if (algoBueno > 50) {
    if (segundaProbBuena < 50) {
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.positivas[Math.ceil(Math.random() * 10)],
        "positiva"
      );
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.positivas[Math.ceil(Math.random() * 10)],
        "positiva"
      );
    }
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.positivas[Math.ceil(Math.random() * 10)],
      "positiva"
    );
  }
  if (algoBueno < 50) {
    if (segundaProbBuena > 50) {
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.positivas[Math.ceil(Math.random() * 10)],
        "positiva"
      );
    }
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.positivas[Math.ceil(Math.random() * 10)],
      "positiva"
    );
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.positivas[Math.ceil(Math.random() * 10)],
      "positiva"
    );
  }
  if (algoMalo > 50) {
    if (segundaProbMala < 50) {
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.negativas[Math.ceil(Math.random() * 10)],
        "negativa"
      );
    }
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.negativas[Math.ceil(Math.random() * 10)],
      "negativa"
    );
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.negativas[Math.ceil(Math.random() * 10)],
      "negativa"
    );
  }
  if (algoMalo < 50) {
    if (segundaProbMala > 50) {
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.negativas[Math.ceil(Math.random() * 10)],
        "negativa"
      );
      gesEst.anadirAnotacion(
        alumnos,
        index,
        notaciones.negativas[Math.ceil(Math.random() * 10)],
        "negativa"
      );
    }
    gesEst.anadirAnotacion(
      alumnos,
      index,
      notaciones.negativas[Math.ceil(Math.random() * 10)],
      "negativa"
    );
  }
}

gesEst.promediar(alumnos);

// terminando de añadirles historial de notas
