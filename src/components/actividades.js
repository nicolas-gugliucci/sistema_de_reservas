
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

function sumar_cupo(actividad_escogida, dia, hora){
    actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == actividad_escogida.toLocaleUpperCase()))][dia][hora].cupos++;
}

