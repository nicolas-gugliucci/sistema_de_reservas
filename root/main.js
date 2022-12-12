let actividad;
let horario;
let socios_registrados = 0;
const socios = [];
alert('Bienvenido al sistema de reservass de actividades del Club Social y Deportivo FING');

class Socio{
    constructor(nombre, apellido, documento, edad, mail, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.edad = edad;
        this.mail = mail;
        this.password = password;
        this.reservas_activas = 0;
        this.reservado = [[0,0,0]]
    }
    registro(){
        this.nombre = prompt('Ingresa tu nombre:').toUpperCase();
        this.apellido = prompt('Ingresa tu apellido:').toUpperCase();
        this.documento = parseInt(prompt('Ingresa tu cédula de identidad sin puntos ni guiones:'));
        this.edad = parseInt(prompt('Ingresa tu edad:'));
        this.mail = prompt('Ingresa tu dirección de correo:');
        this.password = prompt('Ingresa una contraseña:');
    }
    reserva(dia, hora, actividad){
        this.reservado[this.reservas_activas][0]=dia;
        this.reservado[this.reservas_activas][1]=hora;
        this.reservado[this.reservas_activas][2]=actividad;
        this.reservado.push([0,0,0]);
        this.reservas_activas += 1;
    }
    cancelar(a_cancelar){
        this.reservado.splice(a_cancelar+1,1);
        this.reservas_activas -= 1;
    }
}

do{
    const socio1 = new Socio();
    if (!confirm('¿Se encuentra registrado?')){
        socio1.registro();
        if(socios.some(socio => socio.documento == socio1.documento)){
            alert('El documento de identidad ingresado ya se encuentra registrado')
        }else{
            socios.push(socio1);
            socios_registrados += 1;
            alert('Registro exitoso!');    
        }
    }
    let user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
    let error = 0;
    let socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
    while (undefined == socio_ingresado) {
        alert('Usuario incorrecto');
        error += 1;
        if(error==5){
            alert('Ha ingresado incorrectamente su usuario 5 veces, deberá registrarse nuevamente');
            socio1.registro();
            socios.push(socio1);
            socios_registrados += 1;
            alert('Registro exitoso!');
        }
        user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
        socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
    }
    let password = prompt('Ingrese su contraseña:');
    error = 0
    while (password != socio_ingresado.password) {
        alert('Contraseña incorrecta');
        error += 1;
        if(error==5){
            alert('Ha ingresado incorrectamente su contraseña 5 veces, deberá registrarse nuevamente');
            socio1.registro();
            socios.push(socio1);
            socios_registrados += 1;
            alert('Registro exitoso!');
            user = prompt('Ingresa tu numero de documento sin puntos ni guiones \nUsuario:');
            socio_ingresado = socios.find((socio_buscado) => socio_buscado.documento == user);
        }
        password = prompt('Ingrese su contraseña:');
    }
    alert('Bienvenido ' + socio_ingresado.nombre + ' ' + socio_ingresado.apellido);
    do{
        let dia = prompt('¿Qué día deseas reservar? \nIngresa un día (de lunes a viernes)').toUpperCase();
        while (dia != 'LUNES' && dia != 'MARTES' && dia != 'MIERCOLES' && dia != 'JUEVES' && dia != 'VIERNES'){
            alert('Día incorrecto');
            dia = prompt('Ingresa el día que deseas realizar la actividad (de lunes a viernes)').toUpperCase();
        }
        switch (dia){
            case 'LUNES':
                actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
                    alert('Actividad incorrecta');
                    actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                }
                switch (actividad){
                    case 'GIMNASIA':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                    case 'BASKETBOL':
                        horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        }
                        break
                    case 'FUTBOL':
                        horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        }
                        break
                    case 'VOLEY':
                        horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        while (horario != '21:00' && horario != '22:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        }
                        break
                    case 'SPINNING':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                }
                break;
            case 'MARTES':
                actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
                while (actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'AJEDREZ' && actividad != 'AEROBICO'){
                    alert('Actividad incorrecta');
                    actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
                }
                switch (actividad){
                    case 'FUTBOL':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                    case 'VOLEY':
                        horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        }
                        break
                    case 'AJEDREZ':
                        horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        }
                        break
                    case 'AEROBICO':
                        horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
                        while (horario != '20:00' && horario != '21:00' && horario != '22:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
                        }
                        break
                }
                break;
            case 'MIERCOLES':
                actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
                    alert('Actividad incorrecta');
                    actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                }
                switch (actividad){
                    case 'GIMNASIA':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                    case 'BASKETBOL':
                        horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        }
                        break
                    case 'FUTBOL':
                        horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        }
                        break
                    case 'VOLEY':
                        horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        while (horario != '21:00' && horario != '22:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        }
                        break
                    case 'SPINNING':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                }
                break;
            case 'JUEVES':
                actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
                while (actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'AJEDREZ' && actividad != 'AEROBICO'){
                    alert('Actividad incorrecta');
                    actividad = prompt('Actividades disponibles: Futbol, Voley, Ajedrez y Aerobico \nIngresa que actividad deseas realizar:').toUpperCase();
                }
                switch (actividad){
                    case 'FUTBOL':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                    case 'VOLEY':
                        horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        }
                        break
                    case 'AJEDREZ':
                        horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        }
                        break
                    case 'AEROBICO':
                        horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
                        while (horario != '20:00' && horario != '21:00' && horario != '22:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 20:00, 21:00 y 22:00 \nIngresa un horario:');
                        }
                        break
                }
                break;
            case 'VIERNES':
                actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                while (actividad != 'GIMNASIA' && actividad != 'BASKETBOL' && actividad != 'FUTBOL' && actividad != 'VOLEY' && actividad != 'SPINNING'){
                    alert('Actividad incorrecta');
                    actividad = prompt('Actividades disponibles: Gimnasia, Basketbol, Futbol, Voley y Spinning \nIngresa que actividad deseas realizar:').toUpperCase();
                }
                switch (actividad){
                    case 'GIMNASIA':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                    case 'BASKETBOL':
                        horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        while (horario != '15:00' && horario != '16:00' && horario != '17:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 15:00, 16:00 y 17:00 \nIngresa un horario:');
                        }
                        break
                    case 'FUTBOL':
                        horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        while (horario != '09:00' && horario != '10:00' && horario != '11:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 09:00, 10:00 y 11:00 \nIngresa un horario:');
                        }
                        break
                    case 'VOLEY':
                        horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        while (horario != '21:00' && horario != '22:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 21:00 y 22:00 \nIngresa un horario:');
                        }
                        break
                    case 'SPINNING':
                        horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        while (horario != '18:00' && horario != '19:00' && horario != '20:00'){
                            alert('Horario incorrecto');
                            horario = prompt('Horarios disponibles: 18:00, 19:00 y 20:00 \nIngresa un horario:');
                        }
                        break
                }
                break;
        }
        socio_ingresado.reserva(dia, horario, actividad);
        alert('Reserva exitosa!\n\nSocio/a: ' + socio_ingresado.nombre + ' ' + socio_ingresado.apellido + '\nActividad: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][2] + '\nDía: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][0] + '\nHora: ' + socio_ingresado.reservado[socio_ingresado.reservas_activas-1][1])
    }while (confirm('¿Desea realizar otra reserva?'))
    alert('Usted tiene un total de ' + socio_ingresado.reservas_activas + ' reservas activas:');
    for (let i=0;i<socio_ingresado.reservas_activas;i++){
        alert('Reserva N°: ' + (i+1) + '\nActividad: ' + socio_ingresado.reservado[i][2] + '\nDía: ' + socio_ingresado.reservado[i][0] + '\nHora: ' + socio_ingresado.reservado[i][1]);
    }
}while (confirm('¿Desea cambiar de usuario?'))
console.log(socios);