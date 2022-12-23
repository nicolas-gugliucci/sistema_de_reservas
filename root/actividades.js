let actividades = [ 
    aerobico = {
        nombre: 'aerobico',
        dias: ['martes', 'jueves'],
        horas: {martes:['1800','1900'], jueves:['1800','1900']},
        martes: {
            1800:{cupos:20},
            1900:{cupos:20}
        },
        jueves: {
            1800:{cupos:20},
            1900:{cupos:20}
        },
    },
    ajedrez = {
        nombre: 'ajedrez',
        dias: ['martes', 'jueves'],
        horas: {martes:['1800','1900'], jueves:['1800','1900']},
        martes: {
            1800:{cupos:20},
            1900:{cupos:20}
        },
        jueves: {
            1800:{cupos:20},
            1900:{cupos:20}
        },
    },
    futbol = {
        nombre: 'futbol',
        dias: ['lunes', 'jueves'],
        horas: {martes:['1800','1900'], jueves:['1800','1900']},
        lunes: {
            1800:{cupos:1},
            1900:{cupos:20}
        },
        jueves: {
            1800:{cupos:20},
            1900:{cupos:20}
        },
    },
    
];

function actividades_por_dia(dia){
    let actividades_del_dia = [];
    let i = 0;
    actividades.filter((actividad) => actividad.dias.includes(dia)).forEach((actividad) => {
        actividades_del_dia[i] = actividad.nombre;
        i++;
        }
    );
    return actividades_del_dia;
}

function horarios(actividad_escogida, dia){
    return actividades.find((actividad) => actividad.nombre == actividad_escogida).horas[dia];
}

function disponibilidad(actividad_escogida, dia, hora){
    return cupos_disponibles = actividades.find((actividad) => actividad.nombre == actividad_escogida)[dia][hora].cupos;
}

function restar_cupo(actividad_escogida, dia, hora){
    actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre == actividad_escogida))][dia][hora].cupos--;
}

