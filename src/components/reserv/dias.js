const formulario_reserva = document.getElementById('reserva_form');
formulario_reserva.addEventListener('submit', validar_form);
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
function form_dia(){
    console.log('formdia')

    console.log( actividades)

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
        label.innerHTML = `${dia[1][0].toLocaleUpperCase()}${dia[1].substring(1)}`;
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
