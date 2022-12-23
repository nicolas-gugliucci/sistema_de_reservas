let socios_registrados = 0;
const socios = [];

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