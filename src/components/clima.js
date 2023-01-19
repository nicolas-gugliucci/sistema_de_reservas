const APIKEY = '0db3ae95bb2063a463ae97ddebeda0cc';
const LATITUD = '-34.9058916';
const LONGITUD = '-56.1913095';

const pronostico = async (latitud, longitud, apikey, dia, hora) => {
    const response_clima = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&lang=es&appid=${apikey}&units=meters`);
    const data_clima = await response_clima.json();
    const dia_y_hora = DateTime.fromFormat(`${dia} ${hora}`, "EEEE' 'dd'/'LL' 'HHmm", {locale: 'es-ES'});
    const pronostico_data = data_clima.list.find((pronostico) => {
        const pronostico_date = DateTime.fromFormat(`${pronostico.dt_txt}`, "yyyy'-'LL'-'dd' 'HH':'mm':'ss", {locale: 'es-ES'})
        let intervalo = Interval.fromDateTimes(dia_y_hora, pronostico_date);
        return intervalo.length('hours') <= 6;
    });
    let alerta = 0;
    if (pronostico_data == undefined){
        alerta = 1;
    }else{
        alerta = 0;
    }
    pintar_clima(pronostico_data?.weather[0].icon, pronostico_data?.weather[0].description, String(pronostico_data?.main.temp).slice(0,2), alerta)
};

function pintar_clima(icono, descripcion, temperatura, alerta){
    const clima_ant = document?.getElementById("clima");
    clima_ant?.remove();
    const clima = document.createElement('div');
    clima.setAttribute("id", "clima");
    clima.style.alignSelf = "flex-start";
    clima.style.display = "flex";
    clima.style.flexDirection = "column";
    clima.style.alignItems = "center";
    clima.style.textAlign = "center";
    if(alerta){
        clima.innerHTML=`
        <h5>Pronóstico:</h5>
        <h5>No disponible</h5>
    `;
    }else{
        clima.innerHTML=`
        <h5>Pronóstico:</h5>
        <img src="http://openweathermap.org/img/wn/${icono}@2x.png" alt="pronostico del clima">
        <h5>${temperatura}°C</h5>
        <h5>${descripcion[0].toLocaleUpperCase()}${descripcion.substring(1)}</h5>
    `;
    }
    const div_actividades_clima = document.getElementById("div_actividades_clima");
    div_actividades_clima.append(clima);
};
