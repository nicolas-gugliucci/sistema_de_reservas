//----------------------------------RESERVA DESDE SESIÓN INACTIVA-------------------------------
function validar_form(e){
    e.preventDefault();
    const datos = new FormData(formulario_reserva);
    const usuario = datos.get('usuario');
    const contrasena = datos.get('contrasena');
    socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == usuario);
    if (socio_ingresado == undefined) {
        if (!alerta_activada){
            const div_alerta = document.createElement('div');
            div_alerta.setAttribute("id", "alerta_usuario");
            div_alerta.innerHTML = `
                <p>El usuario ingresado no se encuentra registrado</p>
            `;
            const div_usuario = document.getElementById('div_usuario');
            div_usuario.appendChild(div_alerta);
            alerta_activada = 1;
            const input_usuario = document.getElementById('usuario');
            input_usuario.addEventListener('input', () => {
                div_alerta.remove();
                alerta_activada = 0;
            });
        };
    }else if(contrasena != socio_ingresado.password){
        if (!alerta_activada){
            const div_alerta = document.createElement('div');
            div_alerta.setAttribute("id", "alerta_contrasena");
            div_alerta.innerHTML = `
                <p>Contraseña incorrecta</p>
            `;
            const div_contrasena = document.getElementById('div_contrasena');
            div_contrasena.appendChild(div_alerta);
            alerta_activada = 1;
            const input_contrasena = document.getElementById('contrasena');
            input_contrasena.addEventListener('input', () => {
                div_alerta.remove();
                alerta_activada = 0;
            });
        };
    }else{
        actividades_del_socio = actividades;
        for(let i = 0; i<socio_ingresado.reservas_activas; i++){
            actividades_del_socio = actualizar_disponibilidades(actividades_del_socio, socio_ingresado.reservado[i][2], socio_ingresado.reservado[i][0], socio_ingresado.reservado[i][1]);
        };
        localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
        form_dia();
    };
};

//------------------------------RESERVA PASO DÍAS (ACTIVO E INACTIVO)------------------------------

function removeAccents (str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// if (now.hour == 23 && now.minute == 59){
//     const actividades_recargar = actividades_por_dia(now.day);
//     actividades_recargar.forEach((act_rec) => {
//         actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == act_rec.toLocaleUpperCase()))][dia][hora].cupos = 20;
//         actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == act_rec.toLocaleUpperCase()))][dia][hora].activo = true;
//         actividades[actividades.indexOf(actividades.find((actividad) => actividad.nombre.toLocaleUpperCase() == act_rec.toLocaleUpperCase()))][dia].activo = true;
//     }); 
// }
  
function form_dia(){
    formulario_reserva.removeEventListener('submit', validar_form);
    formulario_reserva.innerHTML='';
    const dias = [];
    const div_dias = document.createElement('div');
    div_dias.setAttribute("id", "div_dias");
    div_dias.innerHTML = '';
    formulario_reserva.append(div_dias);
    let i= 0;
    let j = 0;
    for (let i=0;i<=4;i++){
        if (now.plus({ days: j }).weekday == 6){
            j++;
            j++;
        }else if(now.plus({ days: j }).weekday == 7){
            j++;
        }
        console.log(now.plus({ days: j }).weekdayLong[0].toUpperCase()+now.plus({ days: j }).weekdayLong.substring(1))
        dias[i] = [`${now.plus({ days: j }).weekdayLong[0].toUpperCase()}${now.plus({ days: j }).weekdayLong.substring(1)}`, `${now.plus({ days: j }).toLocaleString(f)}`];// ;
        j++;
    };
    dias.forEach((dia) => {
        const input = document.createElement('input');
        input.setAttribute("type", "radio");
        input.setAttribute("class", "btn-check");
        input.setAttribute("name", "dias");
        input.setAttribute("id", `${removeAccents(`${dia[0].toLocaleLowerCase()}`)}`);
        input.setAttribute("autocomplete", `off`);
        !(dias_disponibles.includes(`${dia[0]}`)) && input.setAttribute("disabled", "");
        if(i==0){
            input.setAttribute("checked", "")
            i++;
        };
        const label = document.createElement('label');
        label.setAttribute("class", "btn btn-secondary");
        label.setAttribute("for", `${removeAccents(`${dia[0].toLocaleLowerCase()}`)}`);
        label.innerHTML = `${dia[0]} ${dia[1]}`;
        div_dias.appendChild(input);
        div_dias.appendChild(label);
    });
    const div_actividades_diarias = document.createElement('div');
    div_actividades_diarias.setAttribute("id", "div_actividades_diarias");
    div_actividades_diarias.innerHTML = '';
    formulario_reserva.append(div_actividades_diarias);
    const div_botones = document.createElement('div');
    div_botones.setAttribute("id", "div_botones");
    formulario_reserva.append(div_botones);
    if(!usuario_ingresado){
        const boton = document.createElement('button');
        boton.innerHTML='Cancelar';
        boton.setAttribute("class", "btn btn-danger");
        boton.setAttribute("id", "cancelar");
        div_botones.append(boton);
        const cancelar = document.getElementById('cancelar');
        cancelar.addEventListener("mouseup", cancelar_);
    };
    const boton = document.createElement('button');
    boton.innerHTML='Siguiente';
    boton.setAttribute("type", "submit");
    boton.setAttribute("class", "btn btn-light");
    boton.setAttribute("id", "pre_confirma");
    boton.setAttribute("disabled", "");
    div_botones.append(boton);
    const div_dia = document.getElementById('div_dias');
    chequear_dia();
    div_dia.addEventListener('change', chequear_dia);
};

function cancelar_(){
    formulario_reserva.innerHTML = `
        <h3>Sistema de reservas</h3>
        <div class="mb-3" id="div_usuario">
            <label for="usuario" class="form-label">Documento de identidad</label>
            <input type="text" class="form-control" id="usuario" name="usuario" required>
        </div>
        <div class="mb-3" id="div_contrasena">
            <label for="contrasena" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="contrasena" name="contrasena" required>
        </div>
        <button type="submit" style="align-self: flex-end" class="btn btn-light">Siguiente</button>
    `;
    formulario_reserva.removeEventListener("submit", pantalla_confirmacion);
    formulario_reserva.addEventListener('submit', validar_form);
};

//-------------------------------RESERVA PASO ACTIVIDADES (ACTIVO E INACTIVO)-----------------------------------
function chequear_dia(){
    dia =  (document.querySelector(".btn-check:checked")).id;
    const div_actividades_diarias = document.getElementById('div_actividades_diarias');
    let i = 0;
    div_actividades_diarias.innerHTML='';
    actividades_por_dia(dia).forEach((actividad) => {
        const div_form = document.createElement('div');
        div_form.setAttribute("class", "form-check");
        div_form.style.marginLeft = "10px";
        const obj_actividad = actividades_del_socio.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
        const indice = actividades_del_socio.indexOf(obj_actividad);
        if (actividades_del_socio[indice][dia].activo){
            if (i==0){
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${actividad.toLocaleLowerCase()}" checked>
                    <label class="form-check-label" for="${actividad.toLocaleLowerCase()}">
                        ${actividad}
                    </label>`;
                i++;
            }else{
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${actividad.toLocaleLowerCase()}">
                    <label class="form-check-label" for="${actividad.toLocaleLowerCase()}">
                        ${actividad}
                    </label>`;
            };
        }else{
            div_form.innerHTML = `
                <input class="form-check-input actividades_form" type="radio" name="actividades" id="${actividad.toLocaleLowerCase()}" disabled>
                <label class="form-check-label" for="${actividad.toLocaleLowerCase()}">
                    ${actividad}
                </label>`;
        };
        div_actividades_diarias.append(div_form);
        const div_horarios = document.createElement('div');
        div_horarios.setAttribute("id", `horarios_${actividad.toLocaleLowerCase()}`);
        div_horarios.style.marginLeft = "35px";
        div_horarios.innerHTML='';
        div_actividades_diarias.append(div_horarios);
    });
    horario_nuevo = undefined;
    chequear_actividad();
    div_actividades_diarias.addEventListener('change', chequear_actividad);
};

//--------------------------------RESERVA PASO HORARIOS (ACTIVO E INACTIVO)-------------------------------
function chequear_actividad(){
    actividad = (document.querySelector(".actividades_form:checked")).id;
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
    const horarios_actividad = document.getElementById(`horarios_${actividad.toLocaleLowerCase()}`);
    if ((actividad != actividad_anterior) && (actividad_anterior != '') && (dia_anterior == dia || dia_anterior == '')){
        const a_borrar = document.getElementById(`horarios_${actividad_anterior}`);
        a_borrar.innerHTML = '';
    }
    let i = 0;
    horarios(actividad, dia).forEach((hora) => {
        const div_horario_form = document.createElement('div');
        div_horario_form.setAttribute("class", "form-check");
        let hora_comprimida = Number (hora.slice(0,2).concat(hora.slice(3,5)));
        const obj_actividad = actividades_del_socio.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
        const indice = actividades_del_socio.indexOf(obj_actividad);
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

//--------------------------------RESERVA PASO CONFIRMACIÓN (ACTIVO E INACTIVO)-------------------------------
function pantalla_confirmacion(e){
    e.preventDefault();
    formulario_reserva.removeEventListener("submit", pantalla_confirmacion);
    formulario_reserva.innerHTML = `
        <h4>Confirmación:</h4>
        <div id="resumen_reserva">
            <p>Socio: ${socio_ingresado.nombre} ${socio_ingresado.apellido}</p>
            <p>Día: ${dia}</p>
            <p>Hora: ${horario_nuevo.slice(0,2)}:${horario_nuevo.slice(2,4)}</p>
            <p>Actividad: ${actividad}</p>
        </div>
        <div id="div_botones_confirm">
            <button class="btn btn-secondary" id="atras">Atrás</button>
            <button type="submit" class="btn btn-success" id="confirmar_reserva">Confirmar</button>
        </div>
    `;
    const atras = document.getElementById('atras');
    atras.addEventListener("mouseup", atras_);
    formulario_reserva.addEventListener("submit", efectuar_reserva);
};

function atras_(){
    formulario_reserva.removeEventListener("submit", efectuar_reserva);
    form_dia();
};

//------------------------------------RESERVAR ACTIVIDAD----------------------------------
function efectuar_reserva(e){
    e.preventDefault();
    socio_ingresado.reserva(dia, horario_nuevo, actividad);
    localStorage.setItem('socios',JSON.stringify(socios));
    formulario_reserva.innerHTML = '';
    horario_nuevo_number = Number(horario_nuevo);
    restar_cupo(actividad, dia, horario_nuevo_number);
    if (disponibilidad(actividad, dia, horario_nuevo) == 0){
        actividades = actualizar_disponibilidades(actividades, actividad, dia, horario_nuevo);
    };
    localStorage.setItem('actividades',JSON.stringify(actividades));
    localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
    Swal.fire(
        'Reserva realizada',
        'Su reserva ha sido realizada con éxito',
        'success'
    );
    if (usuario_ingresado){
        sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
        formulario_reserva.removeEventListener("submit", efectuar_reserva);
        const resact = document?.getElementById('resact');
        if (resact != null){
            resact.remove();
            const li_resact = document.getElementById('li_resact');
            li_resact.remove();
        };
        ingresar();
    }else{
        formulario_reserva.innerHTML = `
            <div class="mb-3" id="div_usuario">
                <label for="usuario" class="form-label">Documento de identidad</label>
                <input type="text" class="form-control" id="usuario" name="usuario" required>
            </div>
            <div class="mb-3" id="div_contrasena">
                <label for="contrasena" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="contrasena" name="contrasena" required>
            </div>
            <button type="submit" class="btn btn-light">Siguiente</button>
        `;
        formulario_reserva.removeEventListener("submit", efectuar_reserva);
        formulario_reserva.addEventListener('submit', validar_form);
    };
};
