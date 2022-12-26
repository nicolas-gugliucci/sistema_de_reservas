let socio_ingresado = '';
let actividad;
let horario;
let actividad_anterior = '';
let dia_anterior = '';
let i=1;
let dia = '';
let horario_nuevo = undefined;
const div_actividadess = document.getElementById('actividades');
actividades_totales().forEach((actividad) => {
    let h3 = document.createElement('h3');
    i%2 != 0 ? h3.setAttribute("class", "oscuro"): h3.setAttribute("class", "claro");
    h3.innerHTML = `${actividad}`
    div_actividadess.append(h3);
    i++;
})

i=1;
const div_lmv = document.getElementById('lmv');
const div_mj = document.getElementById('mj');
actividades_totales().forEach((actividad) =>  {
    let div_horario_lmv = document.createElement('div');
    if (actividades_por_dia('lunes').includes(actividad) && actividades_por_dia('miercoles').includes(actividad) && actividades_por_dia('viernes').includes(actividad)){
        i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
        div_horario_lmv.innerHTML = '';
        div_lmv.append(div_horario_lmv);
        horarios(actividad, 'lunes').forEach((horario) => {
            let p = document.createElement('p');
            p.innerHTML = `${horario}`;
            div_horario_lmv.appendChild(p);
        });
    }else{
        i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
        div_lmv.append(div_horario_lmv);
    };
    let div_horario_mj = document.createElement('div');
    if (actividades_por_dia('martes').includes(actividad) && actividades_por_dia('jueves').includes(actividad)){
        i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
        div_horario_mj.innerHTML = '';
        div_mj.append(div_horario_mj);
        horarios(actividad, 'martes').forEach((horario) => {
            let p = document.createElement('p');
            p.innerHTML = `${horario}`;
            div_horario_mj.appendChild(p);
        });
    }else{
        i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
        div_mj.append(div_horario_mj);
    };
    i++;
})



const input_usuario = document.getElementById('usuario');
const formulario_reserva = document.getElementById('reserva_form');
let alerta_activada = 0;
formulario_reserva.addEventListener('submit', validar_form);
function validar_form(e){
    e.preventDefault();
    const datos = new FormData(formulario_reserva);
    const usuario = datos.get('usuario');
    const contrasena = datos.get('contrasena');
    socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == usuario);
    if (socio_ingresado == undefined) {
        if (!alerta_activada){
            let div_alerta = document.createElement('div');
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
            let div_alerta = document.createElement('div');
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
        }
    }else{
        form_dia();
    }
};

function form_dia(){
    formulario_reserva.removeEventListener('submit', validar_form);
    formulario_reserva.innerHTML='';
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const div_dias = document.createElement('div');
    div_dias.setAttribute("id", "div_dias");
    div_dias.innerHTML = '';
    formulario_reserva.append(div_dias);
    let i= 0;
    dias.forEach((dia) => {
        let input = document.createElement('input');
        input.setAttribute("type", "radio");
        input.setAttribute("class", "btn-check");
        input.setAttribute("name", "dias");
        input.setAttribute("id", `${dia.toLocaleLowerCase()}`);
        input.setAttribute("autocomplete", `off`);
        i==0 ? input.setAttribute("checked", ""):{};
        i++;
        let label = document.createElement('label');
        label.setAttribute("class", "btn btn-secondary");
        label.setAttribute("for", `${dia.toLocaleLowerCase()}`);
        label.innerHTML = `${dia}`;
        div_dias.appendChild(input);
        div_dias.appendChild(label);
    });
    const div_actividades_diarias = document.createElement('div');
    div_actividades_diarias.setAttribute("id", "div_actividades_diarias")
    div_actividades_diarias.innerHTML = '';
    formulario_reserva.append(div_actividades_diarias);
    const boton = document.createElement('button');
    boton.innerHTML='Siguiente';
    boton.setAttribute("type", "submit")
    boton.setAttribute("class", "btn btn-primary")
    boton.setAttribute("id", "pre_confirma")
    boton.setAttribute("disabled", "")
    formulario_reserva.append(boton);
    const div_dia = document.getElementById('div_dias');
    div_dia.addEventListener('change', chequear_dia);
}

function chequear_dia(){
    dia =  (document.querySelector(".btn-check:checked")).id;
    const div_actividades_diarias = document.getElementById('div_actividades_diarias');
    let i = 0;
    div_actividades_diarias.innerHTML='';
    actividades_por_dia(dia).forEach((actividad) => {
        const div_form = document.createElement('div');
        div_form.setAttribute("class", "form-check");
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
        }
        div_actividades_diarias.append(div_form);
        const div_horarios = document.createElement('div');
        div_horarios.setAttribute("id", `horarios_${actividad.toLocaleLowerCase()}`);
        div_horarios.innerHTML='';
        div_actividades_diarias.append(div_horarios);
    });
    horario_nuevo = undefined;
    div_actividades_diarias.addEventListener('change', chequear_actividad);
};

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

function pantalla_confirmacion(e){
    e.preventDefault();
    formulario_reserva.removeEventListener("submit", pantalla_confirmacion);
    formulario_reserva.innerHTML = `
        <h4>Confirmación</h4>
        <div id="resumen_reserva">
            <p>Socio: ${socio_ingresado.nombre} ${socio_ingresado.apellido}</p>
            <p>Día: ${dia}</p>
            <p>Hora: ${horario_nuevo.slice(0,2)}:${horario_nuevo.slice(2,4)}</p>
            <p>Actividad: ${actividad}</p>
        </div>
        <button type="submit" class="btn btn-primary" id="confirma">Confirmar</button>
    `;
    formulario_reserva.addEventListener("submit", efectuar_reserva);
}

function efectuar_reserva(e){
    e.preventDefault();
    socio_ingresado.reserva(dia, horario_nuevo, actividad);
    formulario_reserva.innerHTML = '';
    alert('Reserva realizada!');
    if (usuario_ingresado){
        formulario_reserva.removeEventListener("submit", efectuar_reserva);
        const resact = document?.getElementById('resact');
        if (resact != null){
            resact.remove();
            const li_resact = document.getElementById('li_resact');
            li_resact.remove();
        }
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
            <button type="submit" class="btn btn-primary">Siguiente</button>
        `;
        formulario_reserva.removeEventListener("submit", efectuar_reserva);
        formulario_reserva.addEventListener('submit', validar_form);
    }
}

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
        if (i==0){
            div_horario_form.innerHTML = `
            <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora.slice(0,2)}${hora.slice(3,5)}" checked>
            <label class="form-check-label" for="${hora.slice(0,2)}${hora.slice(3,5)}">
                ${hora}
            </label>`;
            i++;
        }else{
            div_horario_form.innerHTML = `
            <input class="form-check-input horarios_form" type="radio" name="horarios" id="${hora.slice(0,2)}${hora.slice(3,5)}">
            <label class="form-check-label" for="${hora.slice(0,2)}${hora.slice(3,5)}">
                ${hora}
            </label>`;
        }
        horarios_actividad.append(div_horario_form);
    });
};



// do{
//     const socio1 = new Socio();
//     if (!confirm('¿Se encuentra registrado?')){
//         socio1.registro();
//         if(socios.some(socio => socio.documento == socio1.documento)){
//             alert('El documento de identidad ingresado ya se encuentra registrado')
//         }else{
//             socios.push(socio1);
//             socios_registrados += 1;
//             alert('Registro exitoso!');    
//         }
//     }
