//--------Variables fecha y hora-------/
var DateTime = luxon.DateTime;
const now = DateTime.now().setLocale('es-ES').setZone("America/Montevideo");
const now_comprimido = now.toFormat("EEEE' 'dd'/'LL");
const Interval = luxon.Interval;

//---------LIMPIEZA------------
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

//dfs