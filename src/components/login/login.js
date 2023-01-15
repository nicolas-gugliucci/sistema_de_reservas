const ingreso = document.getElementById('login');
ingreso.addEventListener("mouseup", desplegar_login);

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