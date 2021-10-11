export class AlquilerMockService{
    crear(){
        return(
            {
                id: 99,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-05',
                fechaDevolucion: '2021-10-07',
                valorTotal: 1000,
                codigoLibro: 7,
                estado: 'pendiente',
                multa: 0
            });
    }

    actualizar(){
        return(
            {
                id: 10,
                nombreLibro: 'Prueba',
                editorial: 'Editorial Planeta',
                URL: 'https://images-na.ssl-images-amazon.com/images/I/51WmNPpn5sL.jpg',
                resumen: 'Robert Langdon',
                categoria: 'Misterio',
                fechaPublicacion: 2003,
                estado: 'Ocupado',
                valorDia: 600,
                codigoLibro: 365853
            });
    }

    actualizarPrestamo(){
        return(
            {
                id: 67,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-05',
                fechaDevolucion: '2021-10-07',
                valorTotal: 1000,
                codigoLibro: 1,
                estado: 'pagado',
                multa: 0
            });
    }
}
