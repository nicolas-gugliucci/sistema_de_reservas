let actividades = [ 
    aerobico = {
        nombre: 'Aerobico',
        dias: ['martes', 'jueves'],
        horas: {martes:['20:00 - 21:00','21:00 - 22:00', '22:00 - 23:00'], jueves:['20:00 - 21:00','21:00 - 22:00', '22:00 - 23:00']},
        martes: {
            2000:{cupos:20},
            2100:{cupos:20},
            2200:{cupos:20}
        },
        jueves: {
            2000:{cupos:20},
            2100:{cupos:20},
            2200:{cupos:20}
        }
    },
    ajedrez = {
        nombre: 'Ajedrez',
        dias: ['martes', 'jueves'],
        horas: {martes:['09:00 - 10:00','10:00 - 11:00', '11:00 - 12:00'], jueves:['09:00 - 10:00','10:00 - 11:00', '11:00 - 12:00']},
        martes: {
            0900:{cupos:20},
            1000:{cupos:20},
            1100:{cupos:20}
        },
        jueves: {
            0900:{cupos:20},
            1000:{cupos:20},
            1100:{cupos:20}
        }
    },
    basketbol = {
        nombre: 'Basketbol',
        dias: ['lunes', 'miercoles', 'viernes'],
        horas: {lunes:['15:00 - 16:00','16:00 - 17:00', '17:00 - 18:00'], miercoles:['15:00 - 16:00','16:00 - 17:00', '17:00 - 18:00'], viernes:['15:00 - 16:00','16:00 - 17:00', '17:00 - 18:00']},
        lunes: {
            1500:{cupos:20},
            1600:{cupos:20},
            1700:{cupos:20}
        },
        miercoles: {
            1500:{cupos:20},
            1600:{cupos:20},
            1700:{cupos:20}
        },
        viernes: {
            1500:{cupos:20},
            1600:{cupos:20},
            1700:{cupos:20}
        }
    },
    futbol = {
        nombre: 'Futbol',
        dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
        horas: {lunes:['09:00 - 10:00','10:00 - 11:00', '11:00 - 12:00'], martes:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], miercoles:['09:00 - 10:00','10:00 - 11:00', '11:00 - 12:00'], jueves:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], viernes:['09:00 - 10:00','10:00 - 11:00', '11:00 - 12:00']},
        lunes: {
            0900:{cupos:20},
            1000:{cupos:20},
            1100:{cupos:20}
        },
        martes: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        miercoles: {
            0900:{cupos:20},
            1000:{cupos:20},
            1100:{cupos:20}
        },
        jueves: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        viernes: {
            0900:{cupos:20},
            1000:{cupos:20},
            1100:{cupos:20}
        }
    },
    gimnasia = {
        nombre: 'Gimnasia',
        dias: ['lunes', 'miercoles', 'viernes'],
        horas: {lunes:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], miercoles:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], viernes:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00']},
        lunes: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        miercoles: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        viernes: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        }
    },
    spinning = {
        nombre: 'Spinning',
        dias: ['lunes', 'miercoles', 'viernes'],
        horas: {lunes:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], miercoles:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00'], viernes:['18:00 - 19:00','19:00 - 20:00', '20:00 - 21:00']},
        lunes: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        miercoles: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        },
        viernes: {
            1800:{cupos:20},
            1900:{cupos:20},
            2000:{cupos:20}
        }
    },
    voley = {
        nombre: 'Voley',
        dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
        horas: {lunes:['21:00 - 22:00','22:00 - 23:00'], martes:['15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'], miercoles:['21:00 - 22:00','22:00 - 23:00'], jueves:['15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'], viernes:['21:00 - 22:00','22:00 - 23:00']},
        lunes: {
            2100:{cupos:20},
            2200:{cupos:20}
        },
        martes: {
            1500:{cupos:20},
            1600:{cupos:20},
            1700:{cupos:20}
        },
        miercoles: {
            2100:{cupos:20},
            2200:{cupos:20}
        },
        jueves: {
            1500:{cupos:20},
            1600:{cupos:20},
            1700:{cupos:20}
        },
        viernes: {
            2100:{cupos:20},
            2200:{cupos:20}
        }
    },
    
];

function actividades_totales(){
    let actividades_totales = [];
    let i = 0;
    actividades.forEach((actividad) => {
        actividades_totales[i] = actividad.nombre;
        i++;
    });
    return actividades_totales.sort();
}

function actividades_por_dia(dia){
    let actividades_del_dia = [];
    let i = 0;
    actividades.filter((actividad) => actividad.dias.includes(dia)).forEach((actividad) => {
        actividades_del_dia[i] = actividad.nombre;
        i++;
    });
    return actividades_del_dia;
}

function horarios(actividad_escogida, dia){
    return actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == actividad_escogida.toLocaleUpperCase()).horas[dia];
}

function disponibilidad(actividad_escogida, dia, hora){
    return cupos_disponibles = actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == actividad_escogida.toLocaleUpperCase())[dia][hora].cupos;
}

function restar_cupo(actividad_escogida, dia, hora){
    actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == actividad_escogida.toLocaleUpperCase()))][dia][hora].cupos--;
}

