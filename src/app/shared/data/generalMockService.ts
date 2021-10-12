export class GeneralMockService{
    consultarId(){
        return({
            id: 8,
            nombreLibro: 'Dan Brown Inferno',
            editorial: 'Editorial Planeta',
            URL: 'http://2.bp.blogspot.com/-09tt7AsXSS0/UZwBAYM1vpI/AAAAAAAAFlo/gbI7YlxsDMw/s1600/Inferno+(espa%C3%B1ol)+01.jpg',
            resumen: 'Resumen de libro',
            categoria: 'Misterio',
            fechaPublicacion: 2013,
            estado: 'Ocupado',
            valorDia: 700,
            codigoLibro: 365451
        });
    }
    consultarIdDos(){
        return({
                id: 1,
                nombreLibro: 'Arsène Lupin - Caballero y Ladrón',
                editorial: 'Blanco&Negro',
                URL: 'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
                resumen: 'Resumen de libro',
                categoria: 'Acción',
                fechaPublicacion: 1905,
                estado: 'Ocupado',
                valorDia: 500,
                codigoLibro: 245456
        });
    }
    consultarPrestamos(){
        return([
            {
                id: 1,
                cedula: 1023009710,
                fechaAlquiler: '2021/24/09',
                fechaDevolucion: '2021/30/09',
                valorTotal: 9100,
                codigoLibro: 8,
                estado: 'pendiente',
                multa: 0
            },
            {
                id: 94,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-04',
                fechaDevolucion: '2021-10-05',
                valorTotal: 2500,
                codigoLibro: 1,
                estado: 'pagado',
                multa: 0
            },
            {
                id: 73,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-03',
                fechaDevolucion: '2021-10-04',
                valorTotal: 700,
                codigoLibro: 2,
                estado: 'pagado',
                multa: 200
            },
            {
                id: 41,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-04',
                fechaDevolucion: '2021-10-05',
                valorTotal: 500,
                codigoLibro: 1,
                estado: 'pendiente',
                multa: 100
            },
            {
                id: 67,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-05',
                fechaDevolucion: '2021-10-07',
                valorTotal: 1000,
                codigoLibro: 1,
                estado: 'pendiente',
                multa: 0
            }
        ]);
    }

    consultarPrestamosDos(){
        return([
            {
                id: 41,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-04',
                fechaDevolucion: '2021-10-05',
                valorTotal: 500,
                codigoLibro: 1,
                estado: 'pendiente',
                multa: 100
            },
            {
                id: 67,
                cedula: 1025009710,
                fechaAlquiler: '2021-10-05',
                fechaDevolucion: '2021-10-07',
                valorTotal: 1000,
                codigoLibro: 1,
                estado: 'pagado',
                multa: 0
            }
        ]);
    }
    getToken(){
        return({
                nombrePersona: 'Daniel Felipe Cardenas Sanchez',
                cedula: 1025009710,
                rol: 'Admin',
                user: 'Daniel'
        });
    }
}
