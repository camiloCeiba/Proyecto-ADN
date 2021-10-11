export class ProductoMockService {
    consultar() {
        return([
            {
                id: 1,
                nombreLibro: 'Arsène Lupin - Caballero y Ladrón',
                editorial: 'Blanco&Negro',
                URL: 'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
                resumen: 'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
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
                resumen: 'En ésta entrega de la serie del famoso ladrón de guante blanco, empieza con una escena nocturna muy inquietante y ubicación desde el primer momento al lector en un estado de gran tensión, lo que supone una distracción para que el lector pueda aplicar su ingenio a descubrir el verdadero misterio que se plantea, el enigma que llegará a César ocupar la Galia y posteriormente a los normandos iniciarán en Francia su despliegue por Europa. Se trata de una gran mole calcárea frente a la costa que oculta un secreto y, según cuenta la leyenda, un inmenso tesoro.',
                categoria: 'Acción',
                fechaPublicacion: 1909,
                estado: 'Ocupado',
                valorDia: 700,
                codigoLibro: 255742
            }
        ]);
    }
}
