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
