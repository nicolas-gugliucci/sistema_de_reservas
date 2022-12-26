let usuario_ingresado = 0;
const socios_del_club = [
    {
    nombre: "Alberto",
    apellido: "Rodriguez",
    documento: 12345678,
    edad:50,
    mail: "alberto.r@gmail.com",
    }
];

const socios = [];

class Socio{
    constructor(nombre, apellido, documento, edad, mail, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = parseInt(documento);
        this.edad = parseInt(edad);
        this.mail = mail;
        this.password = password;
        this.reservas_activas = 0;
        this.reservado = [[0,0,0]]
    }
    reserva(dia, hora, actividad){
        this.reservado[this.reservas_activas][0]=dia;
        this.reservado[this.reservas_activas][1]=hora;
        this.reservado[this.reservas_activas][2]=actividad;
        this.reservado.push([0,0,0]);
        this.reservas_activas += 1;
    }
    cancelar(a_cancelar){
        this.reservado.splice(a_cancelar,1);
        this.reservas_activas -= 1;
    }
}

let alerta_contrasena_activada = 0;
let alerta_socio_activada = 0;
const ingreso = document.getElementById('login');
ingreso.addEventListener("mouseup", desplegar_login);

function desplegar_login(){
    const div_login = document.getElementById('div_login');
    const form_ingreso = document.createElement('form');
    form_ingreso.setAttribute("id", "form_ingreso");
    form_ingreso.innerHTML = `
        <div class="form-floating mb-3" id="div_usuario_1">
            <input type="text" class="form-control" id="usuario_1" name="usuario_1" placeholder="12345678" required>
            <label for="usuario_1">Usuario</label>
        </div>
        <div class="form-floating" id="div_contrasena_1">
            <input type="password" class="form-control" id="contrasena_1" name="contrasena_1" placeholder="Password" required>
            <label for="contrasena_1">Contraseña</label>
        </div>
        <button type="submit">Ingresar</button>
    `;
    div_login.append(form_ingreso);
    const registro = document.createElement('button');
    registro.setAttribute("id", "registro");
    registro.innerHTML = 'Registrarse';
    div_login.append(registro);
    const inicio_registro = document.getElementById('registro');
    inicio_registro.addEventListener("mouseup", proceso_registro);
    ingreso.removeEventListener("mouseup", desplegar_login);
    ingreso.addEventListener("mouseup", ocultar_login);
    form_ingreso.addEventListener("submit", chequear_ingreso);
}

function ocultar_login(){
    const div_login = document.getElementById('div_login');
    div_login.innerHTML = '';
    ingreso.removeEventListener("mouseup", ocultar_login);
    ingreso.addEventListener("mouseup", desplegar_login);
}

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
            div_alerta.innerHTML = `
                <p>El usuario ingresado no se encuentra registrado</p>
            `;
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
            let div_alerta = document.createElement('div');
            div_alerta.setAttribute("id", "alerta_contrasena");
            div_alerta.innerHTML = `
                <p>Contraseña incorrecta</p>
            `;
            const div_contrasena = document.getElementById('div_contrasena_1');
            div_contrasena.appendChild(div_alerta);
            alerta_activada = 1;
            const input_contrasena = document.getElementById('contrasena_1');
            input_contrasena.addEventListener('input', () => {
                div_alerta.remove();
                alerta_activada = 0;
            });
        }
    }else{
        ocultar_login();
        ingresar();
    }
}

function ingresar(){
    ingreso.removeEventListener("mouseup", desplegar_login);
    ingreso.addEventListener("mouseup", desplegar_perfil);
    //pantalla ingreso

    //nav
    const ul = document.querySelector('nav ul');
    const item_reservas_activas = document.createElement('li');
    item_reservas_activas.setAttribute("id", "li_resact");
    item_reservas_activas.innerHTML = '<a href="#resact">Reservas activas</a>';
    ul.append(item_reservas_activas);

    //reservas activas
    const body = document.querySelector('body');
    const section_resact = document.createElement('section');
    section_resact.setAttribute("id", "resact");
    section_resact.style.marginLeft = "20px";
    section_resact.style.marginTop = "30px";
    if (socio_ingresado.reservas_activas == 0){
        section_resact.innerHTML = `
            <h2>Reservas activas</h2>
            <h3>No hay reservas activas</h3>
        `;
        const reservar = document.getElementById('reservas')
        body.insertBefore(section_resact ,reservar);
    }else{
        section_resact.innerHTML = `
            <h2>Reservas activas</h2>
            <div class="row" id="div_cards"></div>
        `;
        const reservar = document.getElementById('reservas')
        body.insertBefore(section_resact ,reservar);
        const div_cards = document.getElementById('div_cards');
        for (let i=0;i<socio_ingresado.reservas_activas;i++){
            const card = document.createElement('div');
            card.setAttribute("class", "col-sm-6 col-md-4 col-lg-3");
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${socio_ingresado.reservado[i][2]}</h5>
                        <p class="card-text">Reservado para el día <strong>${socio_ingresado.reservado[i][0]}</strong> a las <strong>${socio_ingresado.reservado[i][1]}</strong> horas.</p>
                        <button class="btn btn-primary" id="${i}">Cancelar reserva</button>
                    </div>
                </div>
            `;
            div_cards.append(card);
            const cancelar = document.getElementById(`${i}`);
            cancelar.addEventListener("mouseup", (e) => {
                cancelar_reserva(e.target.id);
            })
        }
    }
    
    //reservas
    usuario_ingresado = 1;
    form_dia();

};

function cancelar_reserva(i){
    socio_ingresado.cancelar(i);
    const li_resact = document.getElementById('li_resact');
    li_resact.remove();
    const resact = document.getElementById('resact');
    resact.remove();
    ingresar();
}

function terminar_sesion(){
    usuario_ingresado = 0;
    location.reload();
}

function desplegar_perfil(){
    const div_login = document.getElementById('div_login');
    div_login.innerHTML = '';
    const cerrar_sesion = document.createElement('button');
    cerrar_sesion.setAttribute("id", "cerrar_sesion");
    cerrar_sesion.innerHTML = 'Cerrar sesión';
    div_login.append(cerrar_sesion);
    const boton_cerrar_sesion = document.getElementById("cerrar_sesion");
    boton_cerrar_sesion.addEventListener("mouseup", terminar_sesion);
}

function proceso_registro(){
    const inicio_registro = document.getElementById('registro');
    inicio_registro.removeEventListener("mouseup", proceso_registro);
    const body = document.getElementById("inicio");
    const div_registro = document.createElement('div');
    div_registro.setAttribute("id", "div_registro");
    div_registro.style.zIndex = 7;
    div_registro.style.position = "absolute";
    div_registro.style.top = "106px";
    div_registro.style.right = "0px";
    div_registro.style.backgroundColor = "darkturquoise";
    div_registro.style.display = "flex";
    div_registro.style.alignItems = "center";
    div_registro.style.justifyContent = "center";
    div_registro.innerHTML = `
        <div id="cerrar_registro">
            <i class="bi bi-x"></i>
        </div>
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
            <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>
    `;
    body.append(div_registro);
    const cerrar = document.getElementById('cerrar_registro');
    cerrar.addEventListener("mouseup", cerrar_div_registro);
    const registro_form = document.getElementById('registro_form');
    alerta_contrasena_activada = 0;
    div_usuario_registro = 0;
    registro_form.addEventListener("submit", confirmar_contrasenas);
}

function confirmar_contrasenas(e){
    e.preventDefault();
    const registro_form = document.getElementById('registro_form');
    const datos = new FormData(registro_form);

    const usuario = datos.get('usuario_registro');
    if (socios_del_club.find((socio) => socio.documento == usuario) == undefined){
        alerta_socio_inexistente();
    }else{
        const contrasena = datos.get('contrasena_registro');
        const contrasena_confirm = datos.get('confirm_contrasena');
        contrasena === contrasena_confirm ? registrar_socio(usuario, contrasena) : alerta_contrasenas();
    }
    
}

function alerta_socio_inexistente(){
    if (!alerta_socio_activada){
        const div_alerta = document.createElement('div');
        div_alerta.setAttribute("id", "alerta_socio_inexistente");
        div_alerta.innerHTML = `
            <p>El usuario ingresado no corresponde a un socio del club. Recuerde que para poder registrarse en la página primero debe ser socio del club.</p>
        `;
        const div_usuario_registro = document.getElementById('div_usuario_registro');
        div_usuario_registro.append(div_alerta);
        alerta_socio_activada = 1;
        div_usuario_registro.addEventListener('input', () => {
            div_alerta.remove();
            alerta_socio_activada = 0;
        });
    };
}

function registrar_socio(usuario, contrasena){
    const socio_a_registrar = socios_del_club.find((socio) => socio.documento == usuario);
    const socio = new Socio(socio_a_registrar.nombre, socio_a_registrar.apellido, usuario, socio_a_registrar.edad, socio_a_registrar.mail, contrasena);
    socios.push(socio);
    cerrar_div_registro();
    alert('Registro exitoso!');
}

function alerta_contrasenas(){
    if (!alerta_contrasena_activada){
        const div_alerta = document.createElement('div');
        div_alerta.setAttribute("id", "alerta_contrasena");
        div_alerta.innerHTML = `
            <p>Las contraseñas deben coincidir</p>
        `;
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
}

function cerrar_div_registro(){
    const inicio_registro = document.getElementById('registro');
    const div_registro = document.getElementById("div_registro");
    div_registro.remove();
    inicio_registro.addEventListener("mouseup", proceso_registro);
}