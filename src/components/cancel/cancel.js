//---------------------------CANCELAR RESERVA (DESDE SESIÓN ACTIVA)---------------------------
function cancelar_reserva(i){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Está seguro que desea cancelar la reserva?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancelar reserva',
        cancelButtonText: 'Atrás',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            efectuar_cancelacion(i, socio_ingresado);
            sessionStorage.setItem('sesion_iniciada', JSON.stringify(socio_ingresado));
            swalWithBootstrapButtons.fire(
                'Reserva cancelada!',
                'Tu reserva ha sido cancelada con éxito',
                'success'
            );
            ingresar();
        };
    });
};

function efectuar_cancelacion(i, socio){
    const actividad_cancelar = socio.reservado[i][2];
    const dia_cancelar = socio.reservado[i][0];
    const hora_cancelar = Number(socio.reservado[i][1]);
    sumar_cupo(actividad_cancelar, dia_cancelar, hora_cancelar);
    const obj_actividad = actividades.find((acti) => acti.nombre == (actividad_cancelar[0].toUpperCase() + actividad_cancelar.substring(1)));
    const indice = actividades.indexOf(obj_actividad);
    actividades[indice][dia_cancelar][hora_cancelar].activo = true;
    actividades[indice][dia_cancelar].activo = true;
    if (!dias_disponibles.includes(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`)){
        dias_disponibles.push(`${dia_cancelar[0].toUpperCase()}${dia_cancelar.substring(1)}`);
    }
    socio.cancelar(i);
    const li_resact = document.getElementById('li_resact');
    li_resact.remove();
    const resact = document.getElementById('resact');
    resact.remove();
    localStorage.setItem('socios',JSON.stringify(socios));
    localStorage.setItem('actividades',JSON.stringify(actividades));
    localStorage.setItem('dias_disponibles',JSON.stringify(dias_disponibles));
}
