export class LibrosMockService {
    getLibros() {
        return (
            {
                id: 1,
                cedula: 1023009710,
                fechaAlquiler: '2021/24/09',
                fechaDevolucion: '2021/30/09',
                valorTotal: 9100,
                codigoLibro: 8,
                estado: 'pendiente',
                nombreLibro: 'Dan Brown Inferno',
                editorial: 'Editorial Planeta',
                URL: 'http://2.bp.blogspot.com/-09tt7AsXSS0/UZwBAYM1vpI/AAAAAAAAFlo/gbI7YlxsDMw/s1600/Inferno+(espa%C3%B1ol)+01.jpg',
                resumen: 'Resumen de libro',
                categoria: 'Misterio',
                fechaPublicacion: 2013,
                valorDia: 700,
            }
        );
    }
    getVerLibro() {
        return ({
            id: 1,
            nombreLibro: 'Arsène Lupin - Caballero y Ladrón',
            editorial: 'Blanco&Negro',
            URL: 'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
            resumen: 'Resumen de libro',
            categoria: 'Acción',
            fechaPublicacion: 1905,
            estado: 'Disponible',
            valorDia: 500,
            codigoLibro: 245456
        });
    }

    crear() {
        return ({
            id: 99,
            nombreLibro: 'Nombre Test',
            editorial: 'Blanco&Negro',
            URL: 'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
            resumen: 'Resumen de libro',
            categoria: 'Acción',
            fechaPublicacion: 1905,
            estado: 'Disponible',
            valorDia: 1000,
            codigoLibro: 245447
        });
    }
}
