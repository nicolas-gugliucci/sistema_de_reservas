//-------------------------------VARIABLES-----------------------------------
let socio_ingresado = '';
let actividad;
let horario;
let actividad_anterior = '';
let dia_anterior = '';
let dia = '';
let horario_nuevo = undefined;
let alerta_activada = 0;
let alerta_contrasena_activada = 0;
let alerta_socio_activada = 0;
let alerta_socio_ya_registrado_activada = 0;
let usuario_ingresado = 0;
let dias_disponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
let actividades_del_socio;
let current = "inicio";
let actividades = [];
let dia_completo = '0';

//-----------------------------INSERTA GRILLA DE ACTIVIDADES Y HORARIOS--------------------------
async function grilla_actividades(){
    await obt_act();
    let i=1;
    const div_actividades = document.getElementById('actividades');
    const div_lmv = document.getElementById('lmv');
    const div_mj = document.getElementById('mj');
    actividades_totales().forEach((actividad) =>  {
        const h3 = document.createElement('h3');
        i%2 != 0 ? h3.setAttribute("class", "oscuro"): h3.setAttribute("class", "claro");
        h3.innerHTML = `${actividad}`;
        div_actividades.append(h3);
        const div_horario_lmv = document.createElement('div');
        if (actividades_por_dia('lunes').includes(actividad) && actividades_por_dia('miercoles').includes(actividad) && actividades_por_dia('viernes').includes(actividad)){
            i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
            div_horario_lmv.innerHTML = '';
            div_lmv.append(div_horario_lmv);
            horarios(actividad, 'lunes').forEach((horario) => {
                const p = document.createElement('p');
                p.innerHTML = `${horario}`;
                div_horario_lmv.appendChild(p);
            });
        }else{
            i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
            div_lmv.append(div_horario_lmv);
        };
        const div_horario_mj = document.createElement('div');
        if (actividades_por_dia('martes').includes(actividad) && actividades_por_dia('jueves').includes(actividad)){
            i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
            div_horario_mj.innerHTML = '';
            div_mj.append(div_horario_mj);
            horarios(actividad, 'martes').forEach((horario) => {
                const p = document.createElement('p');
                p.innerHTML = `${horario}`;
                div_horario_mj.appendChild(p);
            });
        }else{
            i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
            div_mj.append(div_horario_mj);
        };
        i++;
    })
}
//------------------------------EVENTOS BÁSICOS--------------------------------
const formulario_reserva = document.getElementById('reserva_form');
formulario_reserva.addEventListener('submit', validar_form);
const ingreso = document.getElementById('login');
ingreso.addEventListener("mouseup", desplegar_login);

//----------------------------RECUPERACION DE STORAGE------------------------------------
async function obt_act(){
    if (localStorage?.getItem('socios') != undefined){
        socios_guardados = JSON.parse(localStorage.getItem('socios'));
        socios_guardados.forEach((socio_guardado) => {
        const socio = new Socio(socio_guardado.nombre, socio_guardado.apellido, socio_guardado.documento, socio_guardado.edad, socio_guardado.mail, socio_guardado.password);
        socio.reservas_activas = socio_guardado.reservas_activas;
        socio.reservado = socio_guardado.reservado;
        socios.push(socio);
        });
    };
    if (localStorage?.getItem('actividades') != undefined){
        actividades = JSON.parse(localStorage.getItem('actividades'));
    }
    else{
        const resp = await fetch('../data/actividades.json');
        const data = await resp.json();
        actividades = data;
    };
    if (localStorage?.getItem('dias_disponibles') != undefined){
        dias_disponibles = JSON.parse(localStorage.getItem('dias_disponibles'));
    };
    if (sessionStorage?.getItem('sesion_iniciada') != undefined){
        datos_sesion_iniciada = JSON.parse(sessionStorage.getItem('sesion_iniciada'));
        socio_ingresado = new Socio(datos_sesion_iniciada.nombre, datos_sesion_iniciada.apellido, datos_sesion_iniciada.documento, datos_sesion_iniciada.edad, datos_sesion_iniciada.mail, datos_sesion_iniciada.password);
        socio_ingresado.reservas_activas = datos_sesion_iniciada.reservas_activas;
        socio_ingresado.reservado = datos_sesion_iniciada.reservado;
        ingresar();
    };
}

//------------------------------RESERVA PASO DÍAS (ACTIVO E INACTIVO)------------------------------
function form_dia(){
    formulario_reserva.removeEventListener('submit', validar_form);
    formulario_reserva.innerHTML='';
    const dias = [];
    const div_dias = document.createElement('div');
    div_dias.setAttribute("id", "div_dias");
    div_dias.innerHTML = '';
    formulario_reserva.append(div_dias);
    let k= 0;
    let j = 0;
    for (let i=0;i<=4;i++){
        if (now.plus({ days: j }).weekday == 6){
            j++;
            j++;
        }else if(now.plus({ days: j }).weekday == 7){
            j++;
        }
        dias[i] = [`${now.plus({ days: j }).weekdayLong[0].toUpperCase()}${now.plus({ days: j }).weekdayLong.substring(1)}`, `${now.plus({ days: j }).setLocale('es').toFormat("EEEE' 'dd'/'LL")}`];// ;
        j++;
    };
    dias.forEach((dia) => {
        const dia_date = DateTime.fromFormat(`${dia[1]}`, "EEEE' 'dd'/'LL", {locale: 'es-ES'});
        let intervalo_dia = Interval.fromDateTimes(dia_date, now);
        if (intervalo_dia.length('days') < 1 ){
            actividades_por_dia(dia[0]).forEach((actividad) => {
                horarios(actividad, dia[0]).forEach((hora) => {
                    const hora_date = DateTime.fromFormat(`${dia[1]} ${hora.slice(0,2).concat(hora.slice(3,5))}`, "EEEE' 'dd'/'LL' 'HHmm", {locale: 'es-ES'});
                    let intervalo = Interval.fromDateTimes(hora_date, now);
                    if ((intervalo.length('hours') > 0.25 )){
                        actividades_del_socio = actualizar_disponibilidades(actividades_del_socio, actividad, dia[0], hora.slice(0,2).concat(hora.slice(3,5)));
                    };
                });
            });
        };
        const input = document.createElement('input');
        input.setAttribute("type", "radio");
        input.setAttribute("class", "btn-check");
        input.setAttribute("name", "dias");
        input.setAttribute("id", `${removeAccents(`${dia[0].toLocaleLowerCase()}`)}`);
        input.setAttribute("autocomplete", `off`);
        if(!(dias_disponibles.includes(`${dia[0]}`))){
            input.setAttribute("disabled", "");
        }else if(k==0){
            input.setAttribute("checked", "");
            k++;
        };
        const label = document.createElement('label');
        label.setAttribute("class", "btn btn-secondary");
        label.setAttribute("for", `${removeAccents(`${dia[0].toLocaleLowerCase()}`)}`);
        label.innerHTML = `${dia[1][0].toLocaleUpperCase()}${dia[1].substring(1)}`;
        div_dias.appendChild(input);
        div_dias.appendChild(label);
    });
    const div_actividades_clima = document.createElement('div');
    div_actividades_clima.setAttribute("id", "div_actividades_clima");
    div_actividades_clima.style.display = "flex";
    div_actividades_clima.style.justifyContent = "space-between";
    formulario_reserva.append(div_actividades_clima);
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
    dia = (document.querySelector(".btn-check:checked")).id;
    dia_completo = document.querySelector(`label[for=${dia}]`).innerHTML.toLowerCase();
    const dia_completo_date = DateTime.fromFormat(`${dia_completo}`, "EEEE' 'dd'/'LL", {locale: 'es-ES'});
    dia_completo = dia_completo_date.toFormat("EEEE' 'dd'/'LL");
    const div_actividades_diarias = document.createElement('div');
    div_actividades_diarias.setAttribute("id", "div_actividades_diarias");
    const div_actividades_clima = document.getElementById("div_actividades_clima");
    div_actividades_clima.innerHTML = '';
    let i = 0;
    actividades_por_dia(dia).forEach((actividad) => {
        const div_form = document.createElement('div');
        div_form.setAttribute("class", "form-check");
        div_form.style.marginLeft = "10px";
        const obj_actividad = actividades_del_socio.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
        const indice = actividades_del_socio.indexOf(obj_actividad);
        if (actividades_del_socio[indice][dia].activo){
            if (i==0){
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}" checked>
                    <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                        ${actividad}
                    </label>`;
                i++;
            }else{
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}">
                    <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                        ${actividad}
                    </label>`;
            };
        }else{
            div_form.innerHTML = `
                <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}" disabled>
                <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                    ${actividad}
                </label>`;
        };
        div_actividades_diarias.append(div_form);
        const div_horarios = document.createElement('div');
        div_horarios.setAttribute("id", `horarios_${removeAccents(actividad.toLocaleLowerCase())}`);
        div_horarios.style.marginLeft = "35px";
        div_horarios.innerHTML='';
        div_actividades_diarias.append(div_horarios);
    });
    div_actividades_clima.append(div_actividades_diarias);
    horario_nuevo = undefined;
    chequear_actividad();
    div_actividades_diarias.addEventListener('change', chequear_actividad);
};

//--------------------------------RESERVA PASO HORARIOS (ACTIVO E INACTIVO)-------------------------------
function chequear_actividad(){
    const actividad_sin_tilde = (document.querySelector(".actividades_form:checked")).id;
    actividad = actividades_por_dia(dia).find((act) => removeAccents(act.toLocaleLowerCase()) == actividad_sin_tilde);
    const horario = (document?.querySelector(".horarios_form:checked"))?.id;
    horario == horario_nuevo && mostrar_horarios(actividad, dia, actividad_anterior, dia_anterior);
    horario_nuevo = (document.querySelector(".horarios_form:checked")).id;
    pronostico(LATITUD, LONGITUD, APIKEY, dia_completo, horario_nuevo);
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
            <p>Día: ${dia_completo[0].toLocaleUpperCase()}${dia_completo.substring(1)}</p>
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
    socio_ingresado.reserva(dia, horario_nuevo, actividad, dia_completo);
    localStorage.setItem('socios',JSON.stringify(socios));
    formulario_reserva.innerHTML = '';
    horario_nuevo_number = Number(horario_nuevo);
    restar_cupo(actividad, dia, horario_nuevo_number);
    if (disponibilidad(actividad, dia, horario_nuevo) == 0){
        actividades = actualizar_disponibilidades(actividades, actividad, dia, horario_nuevo);
    };
    localStorage.setItem('actividades',JSON.stringify(actividades));
    localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
    Swal.fire({
        title: 'Reserva realizada',
        text: 'Su reserva ha sido realizada con éxito',
        icon: 'success',
        background: '#00FFFF',
        confirmButtonColor: '#079E9E'
        }
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
        formulario_reserva.removeEventListener("submit", efectuar_reserva);
        formulario_reserva.addEventListener('submit', validar_form);
    };
};

//---------------------------CANCELAR RESERVA (DESDE SESIÓN ACTIVA)---------------------------
function cancelar_reserva(i){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: '¿Está seguro que desea cancelar la reserva?',
        text: "",
        icon: 'warning',
        background: '#00FFFF',
        showCancelButton: true,
        confirmButtonText: 'Cancelar reserva',
        cancelButtonText: 'Atrás',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            efectuar_cancelacion(i, socio_ingresado);
            const li_resact = document.getElementById('li_resact');
            li_resact.remove();
            const resact = document.getElementById('resact');
            resact.remove();
            sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
            swalWithBootstrapButtons.fire({
                title: '¡Reserva cancelada!',
                text: 'Tu reserva ha sido cancelada con éxito',
                icon: 'success',
                background: '#00FFFF',
            });
            ingresar();
        };
    });
};

function efectuar_cancelacion(i, socio){
    const actividad_cancelar = socio.reservado[i][2];
    const dia_cancelar = socio.reservado[i][0];
    console.log(dia_cancelar)
    const hora_cancelar = Number(socio.reservado[i][1]);
    sumar_cupo(actividad_cancelar, dia_cancelar, hora_cancelar);
    const obj_actividad = actividades.find((acti) => acti.nombre == (actividad_cancelar[0].toUpperCase() + actividad_cancelar.substring(1)));
    const indice = actividades.indexOf(obj_actividad);
    actividades[indice][dia_cancelar][hora_cancelar].activo = true;
    actividades[indice][dia_cancelar].activo = true;
    if (!dias_disponibles.includes(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`)){
        if(dia_cancelar.toLocaleLowerCase() == 'miercoles'){
            dias_disponibles.push('Miércoles');
        }else{
            dias_disponibles.push(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`);
        };
    };
    socio.cancelar(i);
    localStorage.setItem('socios',JSON.stringify(socios));
    localStorage.setItem('actividades',JSON.stringify(actividades));
    localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
}
