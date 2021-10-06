export class Prestamo {
    id: number;
    cedula: number;
    fechaAlquiler: string;
    fechaDevolucion: string;
    valorTotal: number;
    codigoLibro: number;
    estado: string;
    multa: number;
    constructor(
        id: number,
        cedula: number,
        fechaAlquiler: string,
        fechaDevolucion: string,
        valorTotal: number,
        codigoLibro: number,
        estado: string,
        multa: number
        ) {
        this.id = id;
        this.cedula = cedula;
        this.fechaAlquiler = fechaAlquiler;
        this.fechaDevolucion = fechaDevolucion;
        this.codigoLibro = codigoLibro;
        this.valorTotal = valorTotal;
        this.estado = estado;
        this.multa = multa;
    }
}
