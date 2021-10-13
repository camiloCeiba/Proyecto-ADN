export interface Prestamo {
    id: number;
    cedula: number;
    fechaAlquiler: string;
    fechaDevolucion: string;
    valorTotal: number;
    codigoLibro: number;
    estado: string;
    multa: number;
}
