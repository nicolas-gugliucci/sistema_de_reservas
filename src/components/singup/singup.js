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
    const resp = await fetch('./socios.json');
    const data = await resp.json();
    socios_del_club = data;
};

socio_del_club();
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