/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed} from '@angular/core/testing';
import { Libro } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LibroService } from './libro.service';

describe('Service: Libro', () => {

  let httpMock: HttpTestingController;
  let service: LibroService;
  const apiLibros = `${environment.API}/libro`;
  const dummyLibros = new Libro(
    'Libro de Prueba',
    'Blanco&Negro',
    `https://images.cdn2.buscalibre.com/fit-in/360x360/
    96/b9/96b9d711019a6807e4a89495b7089b97.jpg`,
    'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
    'Acción',
    1905,
    'Disponible',
    500,
    245456,
    10,
  );
  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LibroService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LibroService);
  });

  it('should be created', () => {
    const productService: LibroService = TestBed.inject(LibroService);
    expect(productService).toBeTruthy();
  });

  it('deberia traer el libro con id 1', () => {
    service.crear(dummyLibros).then(productos => {
      expect(productos).toEqual(dummyLibros);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('POST');
    req.flush(dummyLibros);
  });

});