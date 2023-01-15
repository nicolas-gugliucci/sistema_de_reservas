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
                        <h5 class="card-title"><strong>${socio_ingresado.reservado[i][2][0].toLocaleUpperCase()}${socio_ingresado.reservado[i][2].substring(1)}</strong></h5>
                        <p class="card-text">Reservado para el día <strong>${socio_ingresado.reservado[i][3]}</strong> a las <strong>${socio_ingresado.reservado[i][1].slice(0,2)}:${socio_ingresado.reservado[i][1].slice(2,4)}</strong> horas.</p>
                        <button style="align-self: flex-end" class="btn btn-primary" id="${i}">Cancelar reserva</button>
                    </div>
                </div>
            `;
            div_cards.append(card);
            const fecha_reserva = DateTime.fromFormat(`${socio_ingresado.reservado[i][3]} ${socio_ingresado.reservado[i][1]}`, "EEEE' 'dd'/'LL' 'HHmm", {locale: 'es-ES'});
            let intervalo = Interval.fromDateTimes(fecha_reserva, now);
            if (intervalo.length('hours') > 0.25 ){
                efectuar_cancelacion(i, socio_ingresado);
                sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
            }
            const cancelar = document.getElementById(`${i}`);
            cancelar.addEventListener("mouseup", (e) => {
                cancelar_reserva(e.target.id);
            });
        };
        if (socio_ingresado.reservas_activas == 0){
            section_resact.innerHTML = `
                <h2>Reservas activas</h2>
                <h3>No hay reservas activas</h3>
            `;
            const reservar = document.getElementById('reservas');
            body.insertBefore(section_resact, reservar);
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