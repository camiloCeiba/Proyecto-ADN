/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';

describe('Service: Services', () => {

  let httpMock: HttpTestingController;
  let service: GeneralService;
  const apiLibros = `${environment.API}/libro/1`;
  const dummyLibros = {
    id: 1,
    nombreLibro: 'Arsène Lupin - Caballero y Ladrón',
    editorial: 'Blanco&Negro',
    URL: 'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
    resumen: 'Resumen de libro',
    categoria: 'Acción',
    fechaPublicacion: 1905,
    estado: 'Disponible',
    valorDia: 500,
  };

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    const productService: GeneralService = TestBed.inject(GeneralService);
    expect(productService).toBeTruthy();
  });


  it('deberia traer el libro con id 1', fakeAsync(() => {
    const id = 1;
    service.consultarId(id).then(productos => {
      expect(productos).toEqual(dummyLibros);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLibros);
  }));
});
