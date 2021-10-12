export class ProductoMockService {
    consultar() {
        return([
            {
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
            },
            {
                id: 2,
                nombreLibro: 'Arsène Lupin - La Aguja Hueca',
                editorial: 'Blanco&Negro',
                URL: 'https://http2.mlstatic.com/D_NQ_NP_2X_744231-MCO46623946556_072021-F.webp',
                resumen: 'Resumen de libro',
                categoria: 'Acción',
                fechaPublicacion: 1909,
                estado: 'Ocupado',
                valorDia: 700,
                codigoLibro: 255742
            }
        ]);
    }
}
