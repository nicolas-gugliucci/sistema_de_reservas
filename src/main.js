//-------------------------------VARIABLES-----------------------------------
let socio_ingresado = '';
let actividad;
let horario;
let actividad_anterior = '';
let dia_anterior = '';
let i=1;
let dia = '';
let horario_nuevo = undefined;
let alerta_activada = 0;
let alerta_contrasena_activada = 0;
let alerta_socio_activada = 0;
let alerta_socio_ya_registrado_activada = 0;
let usuario_ingresado = 0;
let dias_disponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
let actividades_del_socio;
let current = "inicio";
let actividades = [];
const input_usuario = document.getElementById('usuario');
let dia_completo = '0';
    //--------Variables fecha y hora-------/
var DateTime = luxon.DateTime;
DateTime.now().setZone("America/Montevideo");
const now = DateTime.now();
const now_comprimido = now.setLocale('es-ES').toFormat("EEEE' 'dd'/'LL");
const Interval = luxon.Interval;

//--------------------FUNCIONES GENERALES----------------------
const removeAttributes = (element) => {
    let i = 0;
    while (element.attributes.length > 1) {
        if (element.attributes[i].name == 'id'){
            i++;
        }else{
            element.removeAttribute(element.attributes[i].name);
        };
    };
};

function removeAccents (str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

async function obtener_actividades(){
    const resp = await fetch('../src/data/actividades.json');
    const data = await resp.json();
    actividades = data;
};

function actualizar_disponibilidades(actividades_array, actividad, dia, hora){
    const obj_actividad = actividades_array.find((acti) => removeAccents(acti.nombre.toLocaleLowerCase()) == removeAccents(actividad.toLocaleLowerCase()));
    const indice = actividades_array.indexOf(obj_actividad);
    actividades_array[indice][dia][hora].activo = false;
    let actividad_disponible;
    for(const horas in actividades_array[indice][dia]){
        if (actividades_array[indice][dia][horas].activo){
            actividad_disponible = 1;
            break;
        }else{
           actividad_disponible = 0;
        };
    };
    if (!actividad_disponible){
        actividades_array[indice][dia].activo = false;
        let dia_disponible;
        const act_del_dia = actividades_por_dia(dia);
        for(const act of act_del_dia){
            if(actividades_array.find((acti) => acti.nombre == act)[dia].activo){
                dia_disponible = 1;
                break;
            }else{
                dia_disponible = 0;
            };
        };
        if(!dia_disponible){
            if (dias_disponibles.includes(`${dia[0].toUpperCase()}${dia.substring(1)}`)){
                dias_disponibles.splice(dias_disponibles.indexOf(`${dia[0].toUpperCase()}${dia.substring(1)}`),1);
            };
        }    ;
    };
    return actividades_array;
};

//LIMPIEZA
function eliminar_segun_hora(){
    socios.forEach((socio) => {
        if (socio.documento != socio_ingresado.documento){
            for (let i=0;i<socio.reservas_activas;i++){
                const fecha_reserva = DateTime.fromFormat(`${socio.reservado[i][3]} ${socio.reservado[i][1]}`, "EEEE' 'dd'/'LL' 'HHmm", {locale: 'es-ES'});
                let inter = Interval.fromDateTimes(fecha_reserva, now);
                if (inter.length('hours') > 0.25 ){
                    efectuar_cancelacion(i, socio);
                };
            };
        };        
    });
};



//-----------------------------INSERTA GRILLA DE ACTIVIDADES Y HORARIOS--------------------------
async function grilla_actividades(){
    await obt_act();
    const div_actividadess = document.getElementById('actividades');
    actividades_totales().forEach((actividad) => {
        const h3 = document.createElement('h3');
        i%2 != 0 ? h3.setAttribute("class", "oscuro"): h3.setAttribute("class", "claro");
        h3.innerHTML = `${actividad}`;
        div_actividadess.append(h3);
        i++;
    });
    i=1;
    const div_lmv = document.getElementById('lmv');
    const div_mj = document.getElementById('mj');
    actividades_totales().forEach((actividad) =>  {
        const div_horario_lmv = document.createElement('div');
        if (actividades_por_dia('lunes').includes(actividad) && actividades_por_dia('miercoles').includes(actividad) && actividades_por_dia('viernes').includes(actividad)){
            i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
            div_horario_lmv.innerHTML = '';
            div_lmv.append(div_horario_lmv);
            horarios(actividad, 'lunes').forEach((horario) => {
                const p = document.createElement('p');
                p.innerHTML = `${horario}`;
                div_horario_lmv.appendChild(p);
            });
        }else{
            i%2 != 0 ? div_horario_lmv.setAttribute("class", "oscuro"): div_horario_lmv.setAttribute("class", "claro");
            div_lmv.append(div_horario_lmv);
        };
        const div_horario_mj = document.createElement('div');
        if (actividades_por_dia('martes').includes(actividad) && actividades_por_dia('jueves').includes(actividad)){
            i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
            div_horario_mj.innerHTML = '';
            div_mj.append(div_horario_mj);
            horarios(actividad, 'martes').forEach((horario) => {
                const p = document.createElement('p');
                p.innerHTML = `${horario}`;
                div_horario_mj.appendChild(p);
            });
        }else{
            i%2 != 0 ? div_horario_mj.setAttribute("class", "oscuro"): div_horario_mj.setAttribute("class", "claro");
            div_mj.append(div_horario_mj);
        };
        i++;
    })
}


//------------------------------EVENTOS BÁSICOS--------------------------------

    //---------Sección según scroll--------------
window.addEventListener("scroll", nav_scroll);
function nav_scroll(){
    let not_current = current;
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 250) {
            current = section.getAttribute("id"); 
        };
    });
    if(current != not_current){
        const li_inactivo = document?.getElementById(`li_${not_current}`);
        li_inactivo?.removeAttribute("class", "li_activo");
        li_inactivo?.setAttribute("class", "li_inactivo");
    };
    const li_activo = document.getElementById(`li_${current}`);
    li_activo.setAttribute("class", "li_activo");
}

//----------------------------RECUPERACION DE STORAGE------------------------------------
if (localStorage?.getItem('socios') != undefined){
    socios_guardados = JSON.parse(localStorage.getItem('socios'));
    socios_guardados.forEach((socio_guardado) => {
    const socio = new Socio(socio_guardado.nombre, socio_guardado.apellido, socio_guardado.documento, socio_guardado.edad, socio_guardado.mail, socio_guardado.password);
    socio.reservas_activas = socio_guardado.reservas_activas;
    socio.reservado = socio_guardado.reservado;
    socios.push(socio);
    });
};
if (localStorage?.getItem('actividades') != undefined){
    actividades = JSON.parse(localStorage.getItem('actividades'));
}
if (localStorage?.getItem('dias_disponibles') != undefined){
    dias_disponibles = JSON.parse(localStorage.getItem('dias_disponibles'));
};
if (sessionStorage?.getItem('sesion_iniciada') != undefined){
    datos_sesion_iniciada = JSON.parse(sessionStorage.getItem('sesion_iniciada'));
    socio_ingresado = new Socio(datos_sesion_iniciada.nombre, datos_sesion_iniciada.apellido, datos_sesion_iniciada.documento, datos_sesion_iniciada.edad, datos_sesion_iniciada.mail, datos_sesion_iniciada.password);
    socio_ingresado.reservas_activas = datos_sesion_iniciada.reservas_activas;
    socio_ingresado.reservado = datos_sesion_iniciada.reservado;
    ingresar();
};
async function obt_act(){
    if (localStorage?.getItem('socios') != undefined){
        socios_guardados = JSON.parse(localStorage.getItem('socios'));
        socios_guardados.forEach((socio_guardado) => {
        const socio = new Socio(socio_guardado.nombre, socio_guardado.apellido, socio_guardado.documento, socio_guardado.edad, socio_guardado.mail, socio_guardado.password);
        socio.reservas_activas = socio_guardado.reservas_activas;
        socio.reservado = socio_guardado.reservado;
        socios.push(socio);
        });
    };
    if (localStorage?.getItem('actividades') != undefined){
        actividades = JSON.parse(localStorage.getItem('actividades'));
    }
    else{
        await obtener_actividades();
    };
    if (localStorage?.getItem('dias_disponibles') != undefined){
        dias_disponibles = JSON.parse(localStorage.getItem('dias_disponibles'));
    };
    if (sessionStorage?.getItem('sesion_iniciada') != undefined){
        datos_sesion_iniciada = JSON.parse(sessionStorage.getItem('sesion_iniciada'));
        socio_ingresado = new Socio(datos_sesion_iniciada.nombre, datos_sesion_iniciada.apellido, datos_sesion_iniciada.documento, datos_sesion_iniciada.edad, datos_sesion_iniciada.mail, datos_sesion_iniciada.password);
        socio_ingresado.reservas_activas = datos_sesion_iniciada.reservas_activas;
        socio_ingresado.reservado = datos_sesion_iniciada.reservado;
        ingresar();
    };
}