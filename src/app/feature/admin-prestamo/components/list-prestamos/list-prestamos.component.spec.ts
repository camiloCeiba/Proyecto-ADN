import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { LibrosMockService } from '@shared/data/LibrosMockService';
import { GeneralService } from '@shared/services/general.service';
import { SELECTORS } from '@shared/util/selectors';

import { ListPrestamosComponent } from './list-prestamos.component';

describe('ListPrestamosComponent', () => {
  let component: ListPrestamosComponent;
  let fixture: ComponentFixture<ListPrestamosComponent>;
  let generalService: GeneralService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ListPrestamosComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GeneralService, ussClass: GeneralMockService }
        , HttpService, LibrosMockService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrestamosComponent);
    generalService = TestBed.inject(GeneralService);
    component = fixture.componentInstance;
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create ListPrestamosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Se obtiene la lista de libros prestados', fakeAsync(() => {
    let inputNombre: HTMLElement;
    let inputURL: HTMLImageElement;
    let inputeditorial: HTMLSpanElement;
    let inputcategoria: HTMLSpanElement;
    let inputestado: HTMLSpanElement;

    const index = 0;
    spyOn(generalService, 'consultarId').and.returnValue(
      Promise.resolve(new GeneralMockService().consultarId())
    );
    spyOn(generalService, 'consultarPrestamos').and.returnValue(
      Promise.resolve(new GeneralMockService().consultarPrestamos())
    );
    const data = new LibrosMockService().getLibros();
    component.autorizarAlquilar();
    tick(1000);
    fixture.detectChanges();

    inputNombre = SELECTORS.LIBRO.inputNombre(index);
    inputURL = SELECTORS.LIBRO.inputURL(index);
    inputeditorial = SELECTORS.LIBRO.inputeditorial(index);
    inputcategoria = SELECTORS.LIBRO.inputcategoria(index);
    inputestado = SELECTORS.LIBRO.inputestado(index);
    expect(inputURL.src).toEqual(data.URL);
    expect(inputNombre.textContent).toEqual(data.nombreLibro);
    expect(inputeditorial.textContent).toEqual(data.editorial);
    expect(inputcategoria.textContent).toEqual(data.categoria);
    expect(inputestado.textContent).toEqual(data.estado);
  }));
});
