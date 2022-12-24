let socios_registrados = 0;
const socios = [
    {
    nombre: 'Alberto',
    apellido: 'Rodriguez',
    documento: 12345678,
    edad:50,
    mail: 'alberto.r@gmail.com',
    password: 123,
    reservas_activas: 0,
    reservado:[[0,0,0]]
    }
];

class Socio{
    constructor(nombre, apellido, documento, edad, mail, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.edad = edad;
        this.mail = mail;
        this.password = password;
        this.reservas_activas = 0;
        this.reservado = [[0,0,0]]
    }
    registro(){
        this.nombre = prompt('Ingresa tu nombre:').toUpperCase();
        this.apellido = prompt('Ingresa tu apellido:').toUpperCase();
        this.documento = parseInt(prompt('Ingresa tu cédula de identidad sin puntos ni guiones:'));
        this.edad = parseInt(prompt('Ingresa tu edad:'));
        this.mail = prompt('Ingresa tu dirección de correo:');
        this.password = prompt('Ingresa una contraseña:');
    }
    reserva(dia, hora, actividad){
        this.reservado[this.reservas_activas][0]=dia;
        this.reservado[this.reservas_activas][1]=hora;
        this.reservado[this.reservas_activas][2]=actividad;
        this.reservado.push([0,0,0]);
        this.reservas_activas += 1;
    }
    cancelar(a_cancelar){
        this.reservado.splice(a_cancelar+1,1);
        this.reservas_activas -= 1;
    }
}

let alerta_contrasena_activada = 0;
const ingreso = document.getElementById('login');
ingreso.addEventListener("mouseup", desplegar_login);

function desplegar_login(){
    const div_login = document.getElementById('div_login');
    const form_ingreso = document.createElement('form');
    form_ingreso.setAttribute("id", "form_ingreso");
    form_ingreso.innerHTML = `
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="usuario" name="usuario" placeholder="12345678">
            <label for="usuario">Usuario</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Password">
            <label for="contrasena">Contraseña</label>
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
    form_ingreso.addEventListener("submit", ingresar);
}

function ocultar_login(){
    const form_ingreso = document.getElementById('form_ingreso');
    form_ingreso.remove();
    ingreso.removeEventListener("mouseup", ocultar_login);
    ingreso.addEventListener("mouseup", desplegar_login);
}

function ingresar(e){
    e.preventDefault();
    form_ingreso.removeEventListener("submit", ingresar);
    //pantalla ingreso

}

function proceso_registro(){
    const inicio_registro = document.getElementById('registro');
    inicio_registro.removeEventListener("mouseup", proceso_registro);
    const body = document.getElementById("inicio");
    const div_registro = document.createElement('div');
    div_registro.setAttribute("id", "div_registro");
    div_registro.style.zIndex = 7;
    div_registro.style.position = "absolute";
    div_registro.style.top = "500px";
    div_registro.style.left = "500px";
    div_registro.style.backgroundColor = "green";
    div_registro.style.display = "flex";
    div_registro.style.alignItems = "center";
    div_registro.style.justifyContent = "center";
    div_registro.innerHTML = `
        <div id="cerrar_registro">
            <i class="bi bi-x"></i>
        </div>
        <form id="registro_form">
            <div class="mb-3" id="div_nombre">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="mb-3" id="div_apellido">
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellido" name="apellido" required>
            </div>
            <!-- <div class="mb-3" id="div_nacimiento">
                 <label for="nacimiento" class="form-label">Fecha de nacimiento</label>
                 <input type="date" class="form-control" id="nacimiento" name="nacimiento" required>
            </div> -->
            <div class="mb-3" id="div_edad">
                <label for="edad" class="form-label">Edad</label>
                <input type="number" class="form-control" id="edad" name="edad" required>
            </div>
            <div class="mb-3" id="div_mail">
                <label for="mail" class="form-label">E-mail</label>
                <input type="mail" class="form-control" id="mail" name="mail" required>
            </div>
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
    registro_form.addEventListener("submit", confirmar_contrasenas);
}

function confirmar_contrasenas(e){
    e.preventDefault();
    const registro_form = document.getElementById('registro_form');
    const datos = new FormData(registro_form);
    const nombre = datos.get('nombre');
    const apellido = datos.get('apellido');
    const edad = datos.get('edad');
    const mail = datos.get('mail');
    const usuario = datos.get('usuario_registro');
    const contrasena = datos.get('contrasena_registro');
    const contrasena_confirm = datos.get('confirm_contrasena');
    contrasena === contrasena_confirm ? registrar_socio() : alerta_contrasenas();
}

function registrar_socio(){

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