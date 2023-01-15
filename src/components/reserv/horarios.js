//--------------------------------RESERVA PASO HORARIOS (ACTIVO E INACTIVO)-------------------------------
function chequear_actividad(){
    const actividad_sin_tilde = (document.querySelector(".actividades_form:checked")).id;
    actividad = actividades_por_dia(dia).find((act) => removeAccents(act.toLocaleLowerCase()) == actividad_sin_tilde);
    const horario = (document?.querySelector(".horarios_form:checked"))?.id;
    horario == horario_nuevo && mostrar_horarios(actividad, dia, actividad_anterior, dia_anterior);
    horario_nuevo = (document.querySelector(".horarios_form:checked")).id;
    actividad_anterior = actividad;
    dia_anterior = dia;
    const pre_confirma = document.getElementById('pre_confirma');
    pre_confirma.removeAttribute('disabled')
    formulario_reserva.addEventListener("submit", pantalla_confirmacion);
};

function mostrar_horarios(actividad, dia, actividad_anterior, dia_anterior){
    const horarios_actividad = document.getElementById(`horarios_${removeAccents(actividad.toLocaleLowerCase())}`);
    if ((actividad != actividad_anterior) && (actividad_anterior != '') && (dia_anterior == dia || dia_anterior == '')){
        const a_borrar = document.getElementById(`horarios_${removeAccents(actividad_anterior.toLocaleLowerCase())}`);
        a_borrar.innerHTML = '';
    }
    let i = 0;
    console.log('mosthor')

    console.log(actividades)

    horarios(actividad, dia).forEach((hora) => {
        const div_horario_form = document.createElement('div');
        div_horario_form.setAttribute("class", "form-check");
        let hora_comprimida = Number (hora.slice(0,2).concat(hora.slice(3,5)));
        const obj_actividad = actividades_del_socio.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
        const indice = actividades_del_socio.indexOf(obj_actividad);
        // const dia_date = DateTime.fromFormat(`${dia}`, "EEEE", {locale: 'es-ES'});
        // let interva = Interval.fromDateTimes(dia_date, now);
        // if ((interva.length('days') < 1 )){
        //     const hora_comprimida_date = DateTime.fromFormat(`${hora_comprimida}`, "HHmm", {locale: 'es-ES'});
        //     let intervalo = Interval.fromDateTimes(now, hora_comprimida_date);
        //     if (!(intervalo.length('hours') > 0 )){
        //         actividades_del_socio[indice][dia][hora_comprimida].activo = false;
        //         actualizar_disponibilidades(actividades, actividad, dia, hora_comprimida);
        //     }
        // }
        if (actividades_del_socio[indice][dia][hora_comprimida].activo){
            if (i==0){
                div_horario_form.innerHTML = `
                <div>
                    <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora_comprimida}" checked>
                    <label class="form-check-label" for="${hora_comprimida}">
                        ${hora}
                    </label>
                </div>
                <div>
                    <p>Cupos disponibles: ${disponibilidad(actividad, dia, hora_comprimida)}</p> 
                </div>
                `;
                i++;
            }else{
                div_horario_form.innerHTML = `
                <div>
                    <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora_comprimida}">
                    <label class="form-check-label" for="${hora_comprimida}">
                        ${hora}
                    </label>
                </div>
                <div>
                    <p>Cupos disponibles: ${disponibilidad(actividad, dia, hora_comprimida)}</p> 
                </div>
                `;
            };
        }else{
            if ((socio_ingresado.reservado).find((reserva) => (reserva[0] == dia && reserva[1] == String(hora_comprimida) && reserva[2] == actividad)) != undefined){
                div_horario_form.innerHTML = `
                <div>
                    <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora_comprimida}" disabled>
                    <label class="form-check-label" for="${hora_comprimida}">
                        ${hora}
                    </label>
                </div>
                <div>
                    <p>Ya existe una reserva para este horario</p> 
                </div>
                `;
            }else{
                div_horario_form.innerHTML = `
                <div>
                    <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora_comprimida}" disabled>
                    <label class="form-check-label" for="${hora_comprimida}">
                        ${hora}
                    </label>
                </div>
                <div>
                    <p>Sin cupos disponibles</p> 
                </div>
                `;
            };
        };
        horarios_actividad.append(div_horario_form);
    });
};