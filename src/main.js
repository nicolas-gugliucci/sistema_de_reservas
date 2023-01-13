//-------------------------------VARIABLES-----------------------------------
let socio_ingresado = '';
let actividad;
let horario;
let actividad_anterior = '';
let dia_anterior = '';
let i=1;
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
const input_usuario = document.getElementById('usuario');

    //--------Variables fecha y hora-------/
var DateTime = luxon.DateTime;
DateTime.now().setZone("America/Montevideo");
const now = DateTime.now();
const now_comprimido = now.setLocale('es').toFormat("EEEE' 'dd'/'LL");
const Interval = luxon.Interval;

//--------------------FUNCIONES GENERALES----------------------
const removeAttributes = (element) => {
    let i = 0;
    while (element.attributes.length > 1) {
        if (element.attributes[i].name == 'id'){
            i++;
        }else{
            element.removeAttribute(element.attributes[i].name);
        };
    };
};

let actividades = [];
async function obtener_actividades(){
    const resp = await fetch('../src/data/actividades.json');
    const data = await resp.json();
    actividades = data;
};

function actualizar_disponibilidades(actividades, actividad, dia, hora){
    const obj_actividad = actividades.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
    const indice = actividades.indexOf(obj_actividad);
    actividades[indice][dia][hora].activo = false;
    let actividad_disponible;
    for(const horas in actividades[indice][dia]){
        if (actividades[indice][dia][horas].activo){
            actividad_disponible = 1;
            break;
        }else{
           actividad_disponible = 0;
        };
    };
    if (!actividad_disponible){
        actividades[indice][dia].activo = false;
        let dia_disponible;
        const act_del_dia = actividades_por_dia(dia);
        for(const act of act_del_dia){
            if(actividades.find((acti) => acti.nombre == act)[dia].activo){
                dia_disponible = 1;
                break;
            }else{
                dia_disponible = 0;
            };
        };
        if(!dia_disponible){
            if (dias_disponibles.includes(`${dia[0].toUpperCase()}${dia.substring(1)}`)){
                dias_disponibles.splice(dias_disponibles.indexOf(`${dia[0].toUpperCase()}${dia.substring(1)}`),1);
            };
        }    ;
    };
    return actividades;
};

//-----------------------------INSERTA GRILLA DE ACTIVIDADES Y HORARIOS--------------------------
async function grilla_actividades(){
    await obtener_actividades();
    const div_actividadess = document.getElementById('actividades');
    actividades_totales().forEach((actividad) => {
        const h3 = document.createElement('h3');
        i%2 != 0 ? h3.setAttribute("class", "oscuro"): h3.setAttribute("class", "claro");
        h3.innerHTML = `${actividad}`;
        div_actividadess.append(h3);
        i++;
    });
    i=1;
    const div_lmv = document.getElementById('lmv');
    const div_mj = document.getElementById('mj');
    actividades_totales().forEach((actividad) =>  {
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

    //---------Sección según scroll--------------
window.addEventListener("scroll", nav_scroll);
function nav_scroll(){
    let not_current = current;
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 250) {
            current = section.getAttribute("id"); 
        };
    });
    if(current != not_current){
        const li_inactivo = document?.getElementById(`li_${not_current}`);
        li_inactivo?.removeAttribute("class", "li_activo");
        li_inactivo?.setAttribute("class", "li_inactivo");
    };
    const li_activo = document.getElementById(`li_${current}`);
    li_activo.setAttribute("class", "li_activo");
}

//----------------------------RECUPERACION DE STORAGE------------------------------------
if (localStorage?.getItem('socios') != undefined){
    socios_guardados = JSON.parse(localStorage.getItem('socios'));
    socios_guardados.forEach((socio_guardado) => {
    const socio = new Socio(socio_guardado.nombre, socio_guardado.apellido, socio_guardado.documento, socio_guardado.edad, socio_guardado.mail, socio_guardado.password);
    socio.reservas_activas = socio_guardado.reservas_activas;
    socio.reservado = socio_guardado.reservado;
    socios.push(socio);
    });
};
async function obt_act(){
    if (localStorage?.getItem('actividades') != undefined){
        actividades = JSON.parse(localStorage.getItem('actividades'));
    }else{
        await obtener_actividades();
    };
}
obt_act();
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


//----------------------------CLICK EN LOGIN------------------------------------
function desplegar_login(){
    const div_login = document.getElementById('div_login');
    const form_ingreso = document.createElement('form');
    form_ingreso.setAttribute("id", "form_ingreso");
    form_ingreso.innerHTML = `
        <div id="div_usuario_1">
            <label for="usuario_1">Usuario</label>
            <input type="text" class="form-control" id="usuario_1" name="usuario_1" required>
        </div>
        <div id="div_contrasena_1">
            <label for="contrasena_1">Contraseña</label>
            <input type="password" class="form-control" id="contrasena_1" name="contrasena_1" required>
        </div>
        <button class="btn btn-light" style="margin: 10px 0; align-self: flex-end" type="submit">Ingresar</button>
    `;
    div_login.append(form_ingreso);
    const div_preregistro = document.createElement('div');
    div_preregistro.setAttribute("id", "div_preregistro");
    div_preregistro.innerHTML = '<p>¿No tienes cuenta? <button class="btn btn-link" id="registro"> Registrate aquí</button></p>';
    div_login.append(div_preregistro);
    const inicio_registro = document.getElementById('registro');
    inicio_registro.addEventListener("mouseup", proceso_registro);
    ingreso.removeEventListener("mouseup", desplegar_login);
    ingreso.addEventListener("mouseup", ocultar_login);
    form_ingreso.addEventListener("submit", chequear_ingreso);
};
function ocultar_login(){
    const div_login = document.getElementById('div_login');
    div_login.innerHTML = '';
    removeAttributes(div_login);
    ingreso.removeEventListener("mouseup", ocultar_login);
    ingreso.addEventListener("mouseup", desplegar_login);
};

//------------------------------REGISTRO DE USUARIO------------------------------
function proceso_registro(){
    const inicio_registro = document.getElementById('registro');
    inicio_registro.removeEventListener("mouseup", proceso_registro);
    const body = document.getElementById("inicio");
    const div_registro = document.createElement('div');
    div_registro.setAttribute("id", "div_registro");
    div_registro.innerHTML = `
        <button type="button" style="align-self: flex-end; border: none; border-radius: 0" id="cerrar_registro" class="btn btn-outline-light">
            <i class="bi bi-x"></i>
        </button>
        <form id="registro_form">
            <div class="mb-3" id="div_usuario_registro">
                <label for="usuario_registro" class="form-label">Documento de identidad</label>
                <input type="number" class="form-control" id="usuario_registro" name="usuario_registro" required>
            </div>
            <div class="mb-3" id="div_contrasena_registro">
                <label for="contrasena_registro" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="contrasena_registro" name="contrasena_registro" required>
            </div>
            <div class="mb-3" id="div_confirm_contrasena">
                <label for="confirm_contrasena" class="form-label">Confirmar contraseña</label>
                <input type="password" class="form-control" id="confirm_contrasena" name="confirm_contrasena" required>
            </div>
            <button type="submit" style="align-self: flex-end" class="btn btn-light">Registrarse</button>
        </form>
    `;
    body.append(div_registro);
    const cerrar = document.getElementById('cerrar_registro');
    cerrar.addEventListener("mouseup", cerrar_div_registro);
    const registro_form = document.getElementById('registro_form');
    alerta_contrasena_activada = 0;
    alerta_socio_activada = 0;
    alerta_socio_ya_registrado_activada = 0;
    registro_form.addEventListener("submit", confirmar_contrasenas);
    ocultar_login();
}
let socios_del_club = [];

async function socio_del_club(){
    const resp = await fetch('../src/data/socios.json');
    const data = await resp.json();
    socios_del_club = data;
};

async function confirmar_contrasenas(e){
    e.preventDefault();
    const registro_form = document.getElementById('registro_form');
    const datos = new FormData(registro_form);
    const usuario = datos.get('usuario_registro');
    await socio_del_club();
    if (socios_del_club.find((socio) => socio.documento == usuario) == undefined){
        alerta_socio_inexistente();
    }else if(socios.find((socio) => socio.documento == usuario)){
        alerta_socio_ya_registrado();
    }else{
        const contrasena = datos.get('contrasena_registro');
        const contrasena_confirm = datos.get('confirm_contrasena');
        contrasena === contrasena_confirm ? registrar_socio(usuario, contrasena) : alerta_contrasenas();
    };
};

function registrar_socio(usuario, contrasena){
    const socio_a_registrar = socios_del_club.find((socio) => socio.documento == usuario);
    const socio = new Socio(socio_a_registrar.nombre, socio_a_registrar.apellido, usuario, socio_a_registrar.edad, socio_a_registrar.mail, contrasena);
    socios.push(socio);
    localStorage.setItem('socios',JSON.stringify(socios));
    cerrar_div_registro();
    Swal.fire(
        'Registro exitoso',
        '',
        'success'
    );
};

function cerrar_div_registro(){
    const div_registro = document.getElementById("div_registro");
    div_registro.remove();
};

function alerta_socio_inexistente(){
    if (!alerta_socio_activada){
        const div_alerta = document.createElement('div');
        div_alerta.setAttribute("id", "alerta_socio_inexistente");
        div_alerta.innerHTML = `<p style="margin: 0">El usuario ingresado no corresponde a un socio del club. Recuerde que para poder registrarse en la página primero debe ser socio del club.</p>`;
        const div_usuario_registro = document.getElementById('div_usuario_registro');
        div_usuario_registro.append(div_alerta);
        alerta_socio_activada = 1;
        div_usuario_registro.addEventListener('input', () => {
            div_alerta.remove();
            alerta_socio_activada = 0;
        });
    };
};

function alerta_socio_ya_registrado(){
    if (!alerta_socio_ya_registrado_activada){
        const div_alerta = document.createElement('div');
        div_alerta.setAttribute("id", "alerta_socio_ya_registrado");
        div_alerta.innerHTML = `<p style="margin: 0">El usuario ingresado ya se encuentra registrado</p>`;
        const div_usuario_registro = document.getElementById('div_usuario_registro');
        div_usuario_registro.append(div_alerta);
        alerta_socio_ya_registrado_activada = 1;
        div_usuario_registro.addEventListener('input', () => {
            div_alerta.remove();
            alerta_socio_ya_registrado_activada = 0;
        });
    };
};

function alerta_contrasenas(){
    if (!alerta_contrasena_activada){
        const div_alerta = document.createElement('div');
        div_alerta.setAttribute("id", "alerta_contrasena");
        div_alerta.innerHTML = `<p style="margin: 0">Las contraseñas deben coincidir</p>`;
        const div_confirm_contrasena = document.getElementById('div_confirm_contrasena');
        div_confirm_contrasena.append(div_alerta);
        alerta_contrasena_activada = 1;
        const contrasena_registro = document.getElementById('contrasena_registro');
        contrasena_registro.addEventListener('input', () => {
            div_alerta.remove();
            alerta_contrasena_activada = 0;
        });
        div_confirm_contrasena.addEventListener('input', () => {
            div_alerta.remove();
            alerta_contrasena_activada = 0;
        });
    };
};

//------------------------------LOGIN CHEQUEO-----------------------------
function chequear_ingreso(e){
    e.preventDefault();
    const form_ingreso = document.getElementById('form_ingreso');
    const datos = new FormData(form_ingreso);
    const usuario = datos.get('usuario_1');
    const contrasena = datos.get('contrasena_1');
    socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == usuario);
    if (socio_ingresado == undefined) {
        if (!alerta_activada){
            const div_alerta = document.createElement('div');
            div_alerta.setAttribute("id", "alerta_usuario");
            div_alerta.innerHTML = `<p style="margin: 0">El usuario ingresado no se encuentra registrado</p>`;
            const div_usuario = document.getElementById('div_usuario_1');
            div_usuario.appendChild(div_alerta);
            alerta_activada = 1;
            const input_usuario = document.getElementById('usuario_1');
            input_usuario.addEventListener('input', () => {
                div_alerta.remove();
                alerta_activada = 0;
            });
        };
    }else if(contrasena != socio_ingresado.password){
        if (!alerta_activada){
            const div_alerta = document.createElement('div');
            div_alerta.setAttribute("id", "alerta_contrasena");
            div_alerta.innerHTML = `<p style="margin: 0">Contraseña incorrecta</p>`;
            const div_contrasena = document.getElementById('div_contrasena_1');
            div_contrasena.appendChild(div_alerta);
            alerta_activada = 1;
            const input_contrasena = document.getElementById('contrasena_1');
            input_contrasena.addEventListener('input', () => {
                div_alerta.remove();
                alerta_activada = 0;
            });
        };
    }else{
        ocultar_login();
        sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
        ingresar();
    };
};

//-------------------------------SESIÓN ACTIVA-------------------------------------
function ingresar(){
    ingreso.removeEventListener("mouseup", desplegar_login);
    ingreso.addEventListener("mouseup", desplegar_perfil);
    //--------------Pantalla ingreso-----------------
    const button_login = document.getElementById('login');
    const nombre_div_ant = document?.querySelector('header div p');
    nombre_div_ant?.remove();
    const nombre_div = document.createElement('p');
    nombre_div.style.margin = "0 0 0 10px";
    nombre_div.innerHTML = `${(socio_ingresado.nombre).toLocaleUpperCase()} ${(socio_ingresado.apellido).toLocaleUpperCase()}`;
    button_login.append(nombre_div);

    //---------------------Nav------------------------
    const ul = document.querySelector('nav ul');
    const item_reservas_activas = document.createElement('li');
    item_reservas_activas.setAttribute("id", "li_resact");
    item_reservas_activas.innerHTML = '<a href="#resact">Reservas activas</a>';
    const li_reservas = document.getElementById('li_reservas');
    ul.insertBefore(item_reservas_activas, li_reservas);

    //--------------Reservas activas------------------
    const body = document.querySelector('body');
    const section_resact = document.createElement('section');
    section_resact.setAttribute("id", "resact");
    if (socio_ingresado.reservas_activas == 0){
        section_resact.innerHTML = `
            <h2>Reservas activas</h2>
            <h3>No hay reservas activas</h3>
        `;
        const reservar = document.getElementById('reservas');
        body.insertBefore(section_resact, reservar);
    }else{
        section_resact.innerHTML = `
            <h2>Reservas activas</h2>
            <div class="row" id="div_cards"></div>
        `;
        const reservar = document.getElementById('reservas');
        body.insertBefore(section_resact ,reservar);
        const div_cards = document.getElementById('div_cards');
        for (let i=0;i<socio_ingresado.reservas_activas;i++){
            const card = document.createElement('div');
            card.setAttribute("class", "col-sm-6 col-md-4 col-lg-3");
            card.innerHTML = `
                <div class="card" style="margin: 5px 0">
                    <div class="card-body" style="display: flex; flex-direction: column">
                        <h5 class="card-title">${socio_ingresado.reservado[i][2]}</h5>
                        <p class="card-text">Reservado para el día <strong>${socio_ingresado.reservado[i][0]}</strong> a las <strong>${socio_ingresado.reservado[i][1]}</strong> horas.</p>
                        <button style="align-self: flex-end" class="btn btn-primary" id="${i}">Cancelar reserva</button>
                    </div>
                </div>
            `;
            div_cards.append(card);
            const cancelar = document.getElementById(`${i}`);
            cancelar.addEventListener("mouseup", (e) => {
                cancelar_reserva(e.target.id);
            });
        };
    };
    
    //-------------------------Reservas------------------------------
    usuario_ingresado = 1;
    actividades_del_socio = actividades;
    for(let i = 0; i<socio_ingresado.reservas_activas; i++){
        actividades_del_socio = actualizar_disponibilidades(actividades_del_socio, socio_ingresado.reservado[i][2], socio_ingresado.reservado[i][0], socio_ingresado.reservado[i][1]);
    };
    localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
    form_dia();
};

//----------------------------CLICK EN PERFIL----------------------------
function desplegar_perfil(){
    ingreso.removeEventListener("mouseup", desplegar_perfil);
    const div_login = document.getElementById('div_login');
    div_login.innerHTML = '';
    const cerrar_sesion = document.createElement('button');
    cerrar_sesion.setAttribute("id", "cerrar_sesion");
    cerrar_sesion.setAttribute("class", "btn");
    cerrar_sesion.innerHTML = 'Cerrar sesión';
    div_login.append(cerrar_sesion);
    const boton_cerrar_sesion = document.getElementById("cerrar_sesion");
    boton_cerrar_sesion.addEventListener("mouseup", terminar_sesion);
    div_login.addEventListener("mouseenter", oscuro);
    ingreso.addEventListener("mouseup", ocultar_perfil);
};

function oscuro(){
    const div_login = document.getElementById('div_login');
    div_login.style.backgroundColor = "#079E9E";
    div_login.style.color = "aqua";
    div_login.addEventListener("mouseleave", claro);
};

function claro(){
    const div_login = document.getElementById('div_login');
    div_login.style.backgroundColor = "aqua";
    div_login.style.color = "black";
    div_login.addEventListener("mouseenter", oscuro);
};

function ocultar_perfil(){
    const div_login = document.getElementById('div_login');
    div_login.innerHTML = '';
    ingreso.removeEventListener("mouseup", ocultar_perfil);
    ingreso.addEventListener("mouseup", desplegar_perfil);
};

//----------------------------CERRAR SESIÓN-----------------------------
function terminar_sesion(){
    sessionStorage.clear();
    usuario_ingresado = 0;
    location.reload();
};

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
        dias[i] = [`${now.plus({ days: j }).weekdayLong[0].toUpperCase()}${now.plus({ days: j }).weekdayLong.substring(1)}`, `${now.plus({ days: j }).setLocale('es').toFormat("EEEE' 'dd'/'LL")}`];// ;
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
        label.innerHTML = `${dia[1]}`;
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
    const dia_completo = document.querySelector(`label[for=${dia}]`).innerHTML;
    //console.log(now.setLocale('es').toFormat("EEEE' 'dd'/'LL"));
    const h = DateTime.fromFormat(`${dia_completo}`, "EEEE' 'dd'/'LL", {locale: 'es-ES'});
    let o = Interval.fromDateTimes(h, now);
    if (o.length('days') > 1 ){
        console.log('eliminar reserva');
        //guardar en la reserva la fecha en formato h y luego al mostrar las reservas hacer el check 
        //en actividades una vez que cambia el dia el dia que paso deberia quedar en default|| poderia ser que recorra cada socio y actualice cada vez que entra un socio
    }
    // const h =DateTime.fromFormat(`${dia}`, "EEEE' 'dd'/'LL");
    // console.log(h.setLocale('es').toFormat("EEEE' 'dd'/'LL"))
    //console.log(document.querySelector(`label[for=${dia}]`).innerHTML)
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
        title: 'Está seguro que desea cancelar la reserva?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar reserva',
        cancelButtonText: 'Atrás',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Reserva cancelada!',
                'Tu reserva ha sido cancelada con éxito',
                'success'
            );
            const actividad_cancelar = socio_ingresado.reservado[i][2];
            const dia_cancelar = socio_ingresado.reservado[i][0];
            const hora_cancelar = Number(socio_ingresado.reservado[i][1]);
            sumar_cupo(actividad_cancelar, dia_cancelar, hora_cancelar);
            const obj_actividad = actividades.find((acti) => acti.nombre == (actividad_cancelar[0].toUpperCase() + actividad_cancelar.substring(1)));
            const indice = actividades.indexOf(obj_actividad);
            actividades[indice][dia_cancelar][hora_cancelar].activo = true;
            actividades[indice][dia_cancelar].activo = true;
            if (!dias_disponibles.includes(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`)){
                dias_disponibles.push(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`);
            }
            socio_ingresado.cancelar(i);
            const li_resact = document.getElementById('li_resact');
            li_resact.remove();
            const resact = document.getElementById('resact');
            resact.remove();
            sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
            localStorage.setItem('socios',JSON.stringify(socios));
            localStorage.setItem('actividades',JSON.stringify(actividades));
            localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
            ingresar();
        };
    });
};
