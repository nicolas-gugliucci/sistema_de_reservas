async function socio_del_club(){
    const resp = await fetch('/src/components/data/socios.json');
    const data = await resp.json();
    socios_del_club = data;
};

//----------------------------RECUPERACION DE STORAGE------------------------------------
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
        const resp = await fetch('/src/components/data/actividades.json');
        const data = await resp.json();
        actividades = data;
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