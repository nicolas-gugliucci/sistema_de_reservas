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
    actividades.filter((actividad) => actividad.dias.includes(removeAccents(dia).toLocaleLowerCase())).forEach((actividad) => {
        actividades_del_dia[i] = actividad.nombre;
        i++;
    });
    return actividades_del_dia;
}

function horarios(actividad_escogida, dia){
    return actividades.find((actividad) => removeAccents(actividad.nombre.toLocaleLowerCase()) == removeAccents(actividad_escogida.toLocaleLowerCase())).horas[removeAccents(dia).toLocaleLowerCase()];
}

function disponibilidad(actividad_escogida, dia, hora){
    return cupos_disponibles = actividades.find((actividad) => removeAccents(actividad.nombre).toLocaleUpperCase() == removeAccents(actividad_escogida).toLocaleUpperCase())[removeAccents(dia).toLocaleLowerCase()][hora].cupos;
}

function restar_cupo(actividad_escogida, dia, hora){
    actividades[actividades.indexOf(actividades.find((actividad) => removeAccents(actividad.nombre).toLocaleUpperCase() == removeAccents(actividad_escogida).toLocaleUpperCase()))][removeAccents(dia).toLocaleLowerCase()][hora].cupos--;
}

function sumar_cupo(actividad_escogida, dia, hora){
    actividades[actividades.indexOf(actividades.find((actividad) => removeAccents(actividad.nombre).toLocaleUpperCase() == removeAccents(actividad_escogida).toLocaleUpperCase()))][removeAccents(dia).toLocaleLowerCase()][hora].cupos++;
}

function actualizar_disponibilidades(actividades_array, actividad, dia, hora){
    const dia_con_tilde = dia;
    dia = removeAccents(dia).toLocaleLowerCase()
    const obj_actividad = actividades_array.find((acti) => removeAccents(acti.nombre.toLocaleLowerCase()) == removeAccents(actividad.toLocaleLowerCase()));
    const indice = actividades_array.indexOf(obj_actividad);
    actividades_array[indice][dia][hora].activo = false;
    let actividad_disponible;
    for(const horas in actividades_array[indice][dia]){
        if (actividades_array[indice][dia][horas].activo){
            actividad_disponible = 1;
            break;
        }else{
           actividad_disponible = 0;
        };
    };
    if (!actividad_disponible){
        actividades_array[indice][dia].activo = false;
        let dia_disponible;
        const act_del_dia = actividades_por_dia(dia);
        for(const act of act_del_dia){
            if(actividades_array.find((acti) => acti.nombre == act)[dia].activo){
                dia_disponible = 1;
                break;
            }else{
                dia_disponible = 0;
            };
        };
        if(!dia_disponible){
            if (dias_disponibles.includes(`${dia_con_tilde[0].toUpperCase()}${dia_con_tilde.substring(1)}`)){
                dias_disponibles.splice(dias_disponibles.indexOf(`${dia_con_tilde[0].toUpperCase()}${dia_con_tilde.substring(1)}`),1);
            };
        };
    };
    return JSON.parse(JSON.stringify(actividades_array));
};