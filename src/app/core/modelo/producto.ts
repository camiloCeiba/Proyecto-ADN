export class Person {
    nombrePersona: string;
    cedula: number;
    rol: string;
    user: string;

    constructor(nombrePersona: string, cedula: number, rol: string, user: string) {
        this.nombrePersona = nombrePersona;
        this.cedula = cedula;
        this.rol = rol;
        this.user = user;
    }
}

export class Libro {
    nombreLibro: string;
    editorial: string;
    URL: string;
    resumen: string;
    categoria: string;
    fechaPublicacion: number;
    estado: string;
    valorDia: number;
    id: number;
    constructor(
        nombreLibro: string,
        editorial: string,
        URL: string,
        resumen: string,
        categoria: string,
        fechaPublicacion: number,
        estado: string,
        valorDia: number,
        id: number) {
        this.nombreLibro = nombreLibro;
        this.editorial = editorial;
        this.URL = URL;
        this.resumen = resumen;
        this.categoria = categoria;
        this.fechaPublicacion = fechaPublicacion;
        this.estado = estado;
        this.valorDia = valorDia;
        this.id = id;
    }
}
