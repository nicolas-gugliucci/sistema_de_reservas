
const socios = [];

class Socio{
    constructor(nombre, apellido, documento, edad, mail, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = parseInt(documento);
        this.edad = parseInt(edad);
        this.mail = mail;
        this.password = password;
        this.reservas_activas = 0;
        this.reservado = [[0,0,0]]
    }
    reserva(dia, hora, actividad){
        this.reservado[this.reservas_activas][0]=dia;
        this.reservado[this.reservas_activas][1]=hora;
        this.reservado[this.reservas_activas][2]=actividad;
        this.reservado.push([0,0,0]);
        this.reservas_activas += 1;
    }
    cancelar(a_cancelar){
        this.reservado.splice(a_cancelar,1);
        this.reservas_activas -= 1;
    }
}
