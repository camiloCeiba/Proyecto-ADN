import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductoService } from './producto.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
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
    const dummyLibros = [
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
      }];

    service.consultar().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyLibros);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLibros);
  });
});
