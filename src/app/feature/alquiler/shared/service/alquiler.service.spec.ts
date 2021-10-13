/* tslint:disable:no-unused-variable */

import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { AlquilerService } from './alquiler.service';

describe('AlquilerService', () => {
  let httpMock: HttpTestingController;
  let service: AlquilerService;
  const apiLibros = `${environment.API}/libro/1`;
  const apiPrestamo = `${environment.API}/prestamo`;
  const dummyLibro = new Libro(
    'Arsène Lupin - Caballero y Ladrón',
    'Blanco&Negro',
    `https://images.cdn2.buscalibre.com/fit-in/360x360/
    96/b9/96b9d711019a6807e4a89495b7089b97.jpg`,
    'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
    'Acción',
    1905,
    'Disponible',
    700,
    1,
  );

  const dummyPrestamo =
    {
      id: 41,
      cedula: 1025009710,
      fechaAlquiler: '2021-10-04',
      fechaDevolucion: '2021-10-05',
      valorTotal: 500,
      codigoLibro: 1,
      estado: 'pagado',
      multa: 200
    };

  const dummyPrestamoDos =
    {
      id: 99,
      cedula: 1025009710,
      fechaAlquiler: '2021-10-04',
      fechaDevolucion: '2021-10-05',
      valorTotal: 500,
      codigoLibro: 7,
      estado: 'pagado',
      multa: 200
    };

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlquilerService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(AlquilerService);
  });

  it('should be created', () => {
    console.log('10');
    const productService: AlquilerService = TestBed.inject(AlquilerService);
    expect(productService).toBeTruthy();
  });

  it('Deberia actualizar el libro con ID 1 al nuevo valor', () => {
    console.log('11');
    service.actualizar(dummyLibro).then(productos => {
      expect(productos).toEqual(dummyLibro);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<Libro>({body: dummyLibro}));
  });

  it('Deberia actualizar el prestamo a pagado', () => {
    console.log('12');
    service.actualizarPrestamo(dummyPrestamo).then(prestamo => {
      expect(prestamo).toEqual(dummyPrestamo);
    });
    const req = httpMock.expectOne(apiPrestamo + '/41');
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<Prestamo>({body: dummyPrestamo}));
  });

  it('Deberia crear un prestamo', () => {
    console.log('13');
    service.crear(dummyPrestamoDos).then(prestamo => {
      expect(prestamo).toEqual(dummyPrestamoDos);
    });
    const req = httpMock.expectOne(apiPrestamo);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Prestamo>({body: dummyPrestamoDos}));
  });
});
