export class Producto {
    id: string;
    descripcion: string;

    constructor(id: string, descripcion: string) {
        this.id = id;
        this.descripcion = descripcion;
    }
}

export class Libro {
    nombre_libro: string;
    editorial: string;
    URL: string;
    resumen: string;
    categoria: string;
    fechaPublicacion: number;
    estado: string;
    valorDia: number;
    codigoLibro: number

    constructor(    
        nombre_libro: string,
        editorial: string,
        URL: string,
        resumen: string,
        categoria: string,
        fechaPublicacion: number,
        estado: string,
        valorDia: number,
        codigoLibro: number) {
        this.nombre_libro = nombre_libro; 
        this.editorial = editorial; 
        this.URL = URL; 
        this.resumen = resumen; 
        this.categoria = categoria; 
        this.fechaPublicacion = fechaPublicacion; 
        this.estado = estado; 
        this.valorDia = valorDia; 
        this.codigoLibro = codigoLibro; 
    }
}