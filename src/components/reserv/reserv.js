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
    console.log('iniconf' )

    console.log(actividades)
    console.log(actividades_del_socio)
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
    Swal.fire(
        'Reserva realizada',
        'Su reserva ha sido realizada con éxito',
        'success'
    );
    console.log('postconf')

    console.log(actividades)

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

