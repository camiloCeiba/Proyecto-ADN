import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed} from '@angular/core/testing';
import { Libro } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { LibrosMockService } from '@shared/data/LibrosMockService';
import { environment } from 'src/environments/environment';
import { LibroService } from './libro.service';

describe('libroService', () => {

  let httpMock: HttpTestingController;
  let service: LibroService;
  const apiLibros = `${environment.API}/libro`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LibroService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LibroService);
  });

  xit('should be created libroService', () => {
    const productService: LibroService = TestBed.inject(LibroService);
    expect(productService).toBeTruthy();
  });

  it('deberia crear un nuevo libro', () => {
    const libroNew = new LibrosMockService().crear();
    service.crear(libroNew).then(productos => {
      expect(productos).toEqual(libroNew);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Libro>({body: libroNew}));
  });

});
