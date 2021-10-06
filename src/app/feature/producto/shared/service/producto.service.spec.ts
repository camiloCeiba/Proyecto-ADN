import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductoService } from './producto.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Libro } from '@core/modelo/producto';
describe('ProductoService', () => {
  let httpMock: HttpTestingController;
  let service: ProductoService;
  const apiLibros = `${environment.API}/libro`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    const productService: ProductoService = TestBed.inject(ProductoService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar libros', () => {
    const dummyLibros = [new Libro(
                                              'Arsène Lupin - Caballero y Ladrón',
                                              'Blanco&Negro',
                                              `https://images.cdn2.buscalibre.com/fit-in/360x360/
                                              96/b9/96b9d711019a6807e4a89495b7089b97.jpg`,
                                              'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
                                              'Acción',
                                                1905,
                                                'Disponible',
                                                500,
                                                245456,
                                                1,
                                              ), new Libro(
                                                'Arsène Lupin - La Aguja Hueca',
                                                'Blanco&Negro',
                                                'https://http2.mlstatic.com/D_NQ_NP_2X_744231-MCO46623946556_072021-F.webp',
                                                'En ésta entrega de la serie del famoso ladrón de guante blanco, empieza con una escena nocturna muy inquietante y ubicación desde el primer momento al lector en un estado de gran tensión, lo que supone una distracción para que el lector pueda aplicar su ingenio a descubrir el verdadero misterio que se plantea, el enigma que llegará a César ocupar la Galia y posteriormente a los normandos iniciarán en Francia su despliegue por Europa. Se trata de una gran mole calcárea frente a la costa que oculta un secreto y, según cuenta la leyenda, un inmenso tesoro.',
                                                'Acción',
                                                1909,
                                                'Disponible',
                                                700,
                                                255742,
                                                2,
                                                )];

    service.consultar().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyLibros);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLibros);
  });

  // it('deberia crear un producto', () => {
  //   const dummyProducto = new Libro(
  //   'Arsène Lupin - Caballero y Ladrón',
  //   'Blanco&Negro',
  //   'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
  // tslint:disable-next-line: max-line-length
  //   'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
  //   'Acción',
  //     1905,
  //     'Disponible',
  //     500,
  //     245456
  //   );
  //   service.crear(dummyProducto).subscribe((respuesta) => {
  //     expect(respuesta).toEqual(true);
  //   });
  //   const req = httpMock.expectOne(apiEndpointProductos);
  //   expect(req.request.method).toBe('POST');
  //   req.event(new HttpResponse<boolean>({body: true}));
  // });

  // it('deberia eliminar un producto', () => {
  //   const dummyProducto =  new Libro(
  //     'Arsène Lupin - Caballero y Ladrón',
  //     'Blanco&Negro',
  //     'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
  // tslint:disable-next-line: max-line-length
  //     'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
  //     'Acción',
  //       1905,
  //       'Disponible',
  //       500,
  //       245456
  //     );
  //   service.eliminar(dummyProducto).subscribe((respuesta) => {
  //     expect(respuesta).toEqual(true);
  //   });
  //   const req = httpMock.expectOne(`${apiEndpointProductos}/1`);
  //   expect(req.request.method).toBe('DELETE');
  //   req.event(new HttpResponse<boolean>({body: true}));
  // });
});
