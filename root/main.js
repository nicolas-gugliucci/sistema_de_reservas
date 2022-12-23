let actividad;
let horario;

const input_usuario = document.getElementById('usuario');
const formulario_reserva = document.getElementById('reserva_form');
formulario_reserva.addEventListener('submit', validar_form);
form_dia();
function validar_form(e){
    e.preventDefault();
    const datos = new FormData(formulario_reserva);
    const usuario = datos.get('usuario');
    const contrasena = datos.get('contrasena');
    let socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == usuario);
    if (undefined == socio_ingresado) {
        let div = document.createElement('div');
        div.setAttribute("id", "alerta_usuario");
        div.innerHTML = `
        <p>El usuario ingresado no se encuentra registrado</p>
        `;
        const div_usuario = document.getElementById('div_usuario');
//eliminar alertas
        div_usuario.appendChild(div);
        const input_usuario = document.getElementById('usuario');
        input_usuario.addEventListener('input', () => div.remove());
    }else if(contrasena != socio_ingresado.password){
        let div = document.createElement('div');
        div.setAttribute("id", "alerta_contrasena");
        div.innerHTML = `
        <p>Contraseña incorrecta</p>
        `;
        const div_contrasena = document.getElementById('div_contrasena');
//eliminar alertas
        div_contrasena.appendChild(div);
        const input_contrasena = document.getElementById('usuario');
        input_contrasena.addEventListener('input', () => div.remove());
    }else{
        form_dia();
    }
};

function form_dia(){
    // const dias = ['Martes', 'Miércoles', 'Jueves', 'Viernes'];
    // const div_dias = dociment.createElement('div')
    // div_dias.setAttribute("id", "div_dias");
    // div_dias.innerHTML = `
    //     <input type="radio" class="btn-check" name="dias" id="lunes" autocomplete="off" checked>
    //     <label class="btn btn-secondary" for="lunes">Lunes</label>
    //     `;
    // formulario_reserva.append(div_dias);
    // dias.forEach((dia) => {
    //     formulario_reserva.innerHTML = `
    //     <input type="radio" class="btn-check" name="dias" id="${dia.toLocaleLowerCase}" autocomplete="off">
    //     <label class="btn btn-secondary" for="${dia.toLocaleLowerCase}">${dia}</label>
    //     `;
    //     formulario_reserva.append(div_dias);
    // });
    // formulario_reserva.innerHTML = `
    //     <div id="div_actividades"></div>
    //     `;
    formulario_reserva.innerHTML = `
    <div id="div_dias">
        <input type="radio" class="btn-check" name="dias" id="lunes" autocomplete="off" checked>
        <label class="btn btn-secondary" for="lunes">Lunes</label>

        <input type="radio" class="btn-check" name="dias" id="martes" autocomplete="off">
        <label class="btn btn-secondary" for="martes">Martes</label>

        <input type="radio" class="btn-check" name="dias" id="miercoles" autocomplete="off">
        <label class="btn btn-secondary" for="miercoles">Miércoles</label>

        <input type="radio" class="btn-check" name="dias" id="jueves" autocomplete="off">
        <label class="btn btn-secondary" for="jueves">Jueves</label>

        <input type="radio" class="btn-check" name="dias" id="viernes" autocomplete="off">
        <label class="btn btn-secondary" for="viernes">viernes</label>
    </div>
    <div id="div_actividades"></div>
    `;
}
const div_actividades = document.getElementById('div_actividades');
div_actividades.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="basketbol" checked>
            <label class="form-check-label" for="basketbol">
                Basketbol
            </label>
        </div>
        <div id="horarios_basketbol"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="futbol">
            <label class="form-check-label" for="futbol">
                Futbol
            </label>
        </div>
        <div id="horarios_futbol"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="gimnasia">
            <label class="form-check-label" for="gimnasia">
                Gimnasia
            </label>
        </div>
        <div id="horarios_gimnasia"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="spinning">
            <label class="form-check-label" for="spinning">
                Spinning
            </label>
        </div>
        <div id="horarios_spinning"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="voley">
            <label class="form-check-label" for="voley">
                Voley
            </label>
        </div>
        <div id="horarios_voley"></div>
        `;
const div_dias = document.getElementById('div_dias');
div_dias.addEventListener('change', chequear_dia)
function chequear_dia(){
    const dia =  (document.querySelector(".btn-check:checked")).id;
    const div_actividades = document.getElementById('div_actividades');
    if (dia == 'lunes' || dia == 'miercoles' || dia == 'viernes'){
        
        div_actividades.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="basketbol" checked>
            <label class="form-check-label" for="basketbol">
                Basketbol
            </label>
        </div>
        <div id="horarios_basketbol"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="futbol">
            <label class="form-check-label" for="futbol">
                Futbol
            </label>
        </div>
        <div id="horarios_futbol"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="gimnasia">
            <label class="form-check-label" for="gimnasia">
                Gimnasia
            </label>
        </div>
        <div id="horarios_gimnasia"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="spinning">
            <label class="form-check-label" for="spinning">
                Spinning
            </label>
        </div>
        <div id="horarios_spinning"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="voley">
            <label class="form-check-label" for="voley">
                Voley
            </label>
        </div>
        <div id="horarios_voley"></div>
        `;
        let actividad_anterior;
        div_actividades.addEventListener('change', chequear_actividad)
        function chequear_actividad(){
            const actividad =  (document.querySelector(".form-check-input:checked")).id;
            (actividad != actividad_anterior) && horarios_lmv(actividad);
            actividad_anterior = actividad;
        };
    }else{
        div_actividades.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="aerobico" checked>
            <label class="form-check-label" for="aerobico">
                Aeróbico
            </label>
        </div>
        <div id="horarios_aerobico"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="ajedrez">
            <label class="form-check-label" for="ajedrez">
                Ajedréz
            </label>
        </div>
        <div id="horarios_ajedrez"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="futbol">
            <label class="form-check-label" for="futbol">
                Futbol
            </label>
        </div>
        <div id="horarios_futbol"></div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="actividades" id="voley">
            <label class="form-check-label" for="voley">
                Voley
            </label>
        </div>
        <div id="horarios_voley"></div>
        `;
        let actividad_anterior;
        div_actividades.addEventListener('change', chequear_actividad)
        function chequear_actividad(){
            const actividad = (document.querySelector(".form-check-input:checked")).id;
            (actividad != actividad_anterior) && horarios_mj(actividad);
            actividad_anterior = actividad;
        };
    }
}

function horarios_mj(actividad){
    switch (actividad){
        case 'aerobico':
            limpiar_horarios();
            const horarios_aerobico = document.getElementById('horarios_aerobico');
            horarios_aerobico.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2000" checked>
                    <label class="form-check-label" for="2000">
                        20:00 - 21:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2100">
                    <label class="form-check-label" for="2100">
                        21:00 - 22:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2200">
                    <label class="form-check-label" for="2200">
                        22:00 - 23:00
                    </label>
                </div>
            `
        break;
        case 'ajedrez':
            limpiar_horarios();
            const horarios_ajedrez = document.getElementById('horarios_ajedrez');
            horarios_ajedrez.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="0900" checked>
                    <label class="form-check-label" for="0900">
                        09:00 - 10:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1000">
                    <label class="form-check-label" for="1000">
                        10:00 - 11:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1100">
                    <label class="form-check-label" for="1100">
                        11:00 - 12:00
                    </label>
                </div>
            `
        break;
        case 'futbol':
            limpiar_horarios();
            const horarios_futbol = document.getElementById('horarios_futbol');
            horarios_futbol.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1800" checked>
                    <label class="form-check-label" for="1800">
                        18:00 - 19:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1900">
                    <label class="form-check-label" for="1900">
                        19:00 - 20:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2000">
                    <label class="form-check-label" for="2000">
                        20:00 - 21:00
                    </label>
                </div>
            `
        break;
        case 'voley':
            limpiar_horarios();
            const horarios_voley = document.getElementById('horarios_voley');
            horarios_voley.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1500" checked>
                    <label class="form-check-label" for="1500">
                        15:00 - 16:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1600">
                    <label class="form-check-label" for="1600">
                        16:00 - 17:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1700">
                    <label class="form-check-label" for="1700">
                        17:00 - 18:00
                    </label>
                </div>
            `
        break;
    }
}

function horarios_lmv(actividad){
    switch (actividad){
        case 'basketbol':
            limpiar_horarios();
            const horarios_basketbol = document.getElementById('horarios_basketbol');
            horarios_basketbol.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1500" checked>
                    <label class="form-check-label" for="1500">
                        15:00 - 16:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1600">
                    <label class="form-check-label" for="1600">
                        16:00 - 17:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1700">
                    <label class="form-check-label" for="1700">
                        17:00 - 18:00
                    </label>
                </div>
            `
        break;
        case 'futbol':
            limpiar_horarios();
            const horarios_futbol = document.getElementById('horarios_futbol');
            horarios_futbol.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="0900" checked>
                    <label class="form-check-label" for="0900">
                        09:00 - 10:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1000">
                    <label class="form-check-label" for="1000">
                        10:00 - 11:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1100">
                    <label class="form-check-label" for="1100">
                        11:00 - 12:00
                    </label>
                </div>
            `
        break;
        case 'gimnasia':
            limpiar_horarios();
            const horarios_gimnasia = document.getElementById('horarios_gimnasia');
            horarios_gimnasia.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1800" checked>
                    <label class="form-check-label" for="1800">
                        18:00 - 19:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1900">
                    <label class="form-check-label" for="1900">
                        19:00 - 20:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2000">
                    <label class="form-check-label" for="2000">
                        20:00 - 21:00
                    </label>
                </div>
            `
        break;
        case 'spinning':
            limpiar_horarios();
            const horarios_spinning = document.getElementById('horarios_spinning');
            horarios_spinning.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1800" checked>
                    <label class="form-check-label" for="1800">
                        18:00 - 19:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="1900">
                    <label class="form-check-label" for="1900">
                        19:00 - 20:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2000">
                    <label class="form-check-label" for="2000">
                        20:00 - 21:00
                    </label>
                </div>
            `
        break;
        case 'voley':
            limpiar_horarios();
            const horarios_voley = document.getElementById('horarios_voley');
            horarios_voley.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2100" checked>
                    <label class="form-check-label" for="2100">
                        21:00 - 22:00
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="horarios" id="2200">
                    <label class="form-check-label" for="2200">
                        22:00 - 23:00
                    </label>
                </div>
            `
        break;
    }
}

function limpiar_horarios(){
    const actividades =[
                    document?.getElementById('horarios_aerobico'), 
                    document?.getElementById('horarios_ajedrez'), 
                    document?.getElementById('horarios_basketbol'), 
                    document?.getElementById('horarios_futbol'),
                    document?.getElementById('horarios_gimnasia'),
                    document?.getElementById('horarios_spinning'),
                    document?.getElementById('horarios_voley')
                ];
    actividades.forEach((actividad) => {(actividad!=null)&&(actividad.innerHTML='')});
}


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
//     let user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
//     let error = 0;
//     let socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
//     while (undefined == socio_ingresado) {
//         alert('Usuario incorrecto');
//         error += 1;
//         if(error==5){
//             alert('Ha ingresado incorrectamente su usuario 5 veces, deberá registrarse nuevamente');
//             socio1.registro();
//             socios.push(socio1);
//             socios_registrados += 1;
//             alert('Registro exitoso!');
//         }
//         user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
//         socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
//     }
//     let password = prompt('Ingrese su contraseña:');
//     error = 0
//     while (password != socio_ingresado.password) {
//         alert('Contraseña incorrecta');
//         error += 1;
//         if(error==5){
//             alert('Ha ingresado incorrectamente su contraseña 5 veces, deberá registrarse nuevamente');
//             socio1.registro();
//             socios.push(socio1);
//             socios_registrados += 1;
//             alert('Registro exitoso!');
//             user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
//             socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
//         }
//         password = prompt('Ingrese su contraseña:');
//     }
//     alert('Bienvenido ' + socio_ingresado.nombre + ' ' + socio_ingresado.apellido);
//     do{
//         let dia = prompt('¿Qué día deseas reservar? \nIngresa un día (de lunes a viernes)').toUpperCase();
//         while (dia != 'LUNES' && dia != 'MARTES' && dia != 'MIERCOLES' && dia != 'JUEVES' && dia != 'VIERNES'){
//             alert('Día incorrecto');
//             dia = prompt('Ingresa el día que deseas realizar la actividad (de lunes a viernes)').toUpperCase();
//         }
//         switch (dia){
//             case 'LUNES':
//                 actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
//                     alert('Actividad incorrecta');
//                     actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 }
//                 switch (actividad){
//                     case 'GIMNASIA':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'BASKETBOL':
//                         horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'FUTBOL':
//                         horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'VOLEY':
//                         horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         while (horario != '21:00' && horario != '22:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'SPINNING':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                 }
//                 break;
//             case 'MARTES':
//                 actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
//                 while (actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'AJEDREZ' && actividad != 'AEROBICO'){
//                     alert('Actividad incorrecta');
//                     actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
//                 }
//                 switch (actividad){
//                     case 'FUTBOL':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'VOLEY':
//                         horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'AJEDREZ':
//                         horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'AEROBICO':
//                         horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
//                         while (horario != '20:00' && horario != '21:00' && horario != '22:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
//                         }
//                         break
//                 }
//                 break;
//             case 'MIERCOLES':
//                 actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
//                     alert('Actividad incorrecta');
//                     actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 }
//                 switch (actividad){
//                     case 'GIMNASIA':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'BASKETBOL':
//                         horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'FUTBOL':
//                         horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'VOLEY':
//                         horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         while (horario != '21:00' && horario != '22:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'SPINNING':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                 }
//                 break;
//             case 'JUEVES':
//                 actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
//                 while (actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'AJEDREZ' && actividad != 'AEROBICO'){
//                     alert('Actividad incorrecta');
//                     actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
//                 }
//                 switch (actividad){
//                     case 'FUTBOL':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'VOLEY':
//                         horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'AJEDREZ':
//                         horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'AEROBICO':
//                         horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
//                         while (horario != '20:00' && horario != '21:00' && horario != '22:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
//                         }
//                         break
//                 }
//                 break;
//             case 'VIERNES':
//                 actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
//                     alert('Actividad incorrecta');
//                     actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
//                 }
//                 switch (actividad){
//                     case 'GIMNASIA':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'BASKETBOL':
//                         horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'FUTBOL':
//                         horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'VOLEY':
//                         horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         while (horario != '21:00' && horario != '22:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
//                         }
//                         break
//                     case 'SPINNING':
//                         horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
//                             alert('Horario incorrecto');
//                             horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
//                         }
//                         break
//                 }
//                 break;
//         }
//         socio_ingresado.reserva(dia, horario, actividad);
//         alert('Reserva exitosa!\n\nSocio/a: ' + socio_ingresado.nombre + ' ' + socio_ingresado.apellido + '\nActividad: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][2] + '\nDía: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][0] + '\nHora: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][1])
//     }while (confirm('¿Desea realizar otra reserva?'))
//     alert('Usted tiene un total de ' + socio_ingresado.reservas_activas + ' reservas activas:');
//     for (let i=0;i<socio_ingresado.reservas_activas;i++){
//         alert('Reserva N°: ' + (i+1) + '\nActividad: ' + socio_ingresado.reservado[i][2] + '\nDía: ' + socio_ingresado.reservado[i][0] + '\nHora: ' + socio_ingresado.reservado[i][1]);
//     }
// }while (confirm('¿Desea cambiar de usuario?'))
// console.log(socios);