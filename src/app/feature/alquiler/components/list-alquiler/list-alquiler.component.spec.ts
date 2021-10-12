import { AlquilerService } from '@alquiler//shared/service/alquiler.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { AlquilerMockService } from '@shared/data/alquilerMockService';
import { GeneralMockService } from '@shared/data/generalMockService';
import { GeneralService } from '@shared/services/general.service';
import { SELECTORS } from '@shared/util/selectors';

import { ListAlquilerComponent } from './list-alquiler.component';

describe('ListAlquilerComponent', () => {
  let component: ListAlquilerComponent;
  let fixture: ComponentFixture<ListAlquilerComponent>;
  let generalService: GeneralService;
  let alquilerService: AlquilerService;
  let routeSpy;
  beforeEach(fakeAsync(() => {
    routeSpy = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ListAlquilerComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GeneralService, ussClass: GeneralMockService },
        { provide: AlquilerService, ussClass: AlquilerMockService },
        { provide: Router, useValue: routeSpy },
        HttpService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlquilerComponent);
    component = fixture.componentInstance;
    alquilerService = TestBed.inject(AlquilerService);
    generalService = TestBed.inject(GeneralService);
    spyOn(alquilerService, 'actualizar').and.returnValue(
      Promise.resolve(new AlquilerMockService().actualizar())
    );
    spyOn(alquilerService, 'actualizarPrestamo').and.returnValue(
      Promise.resolve(new AlquilerMockService().actualizarPrestamo())
    );
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    spyOn(generalService, 'consultarPrestamos').and.returnValue(
      Promise.resolve(new GeneralMockService().consultarPrestamosDos())
    );
    spyOn(generalService, 'consultarId').and.returnValue(
      Promise.resolve(new GeneralMockService().consultarIdDos())
    );
    fixture.detectChanges();
  });

  it('should create ListAlquilerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('La lista se llena con la informacion de alquiler', fakeAsync(() => {
    console.log('25');
    const i = 0;
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    const imgURL = SELECTORS.LISTALQUILER.imgURL(i);
    const spanEditorial = SELECTORS.LISTALQUILER.spanEditorial(i);
    const spanCategoria = SELECTORS.LISTALQUILER.spanCategoria(i);
    const spanFechaPubli = SELECTORS.LISTALQUILER.spanFechaPubli(i);
    const spanEstado = SELECTORS.LISTALQUILER.spanEstado(i);
    const spanValor = SELECTORS.LISTALQUILER.spanValor(i);
    const spanCodigo = SELECTORS.LISTALQUILER.spanCodigo(i);
    const spanFechaDevo = SELECTORS.LISTALQUILER.spanFechaDevo(i);
    const prestamo = new GeneralMockService().consultarPrestamosDos();
    const producto = new GeneralMockService().consultarIdDos();
    expect(spanFechaPubli.textContent).toEqual(producto.fechaPublicacion.toString());
    expect(imgURL.src).toEqual(producto.URL);
    expect(spanCategoria.textContent).toEqual(producto.categoria);
    expect(spanEditorial.textContent).toEqual(producto.editorial);
    expect(spanValor.textContent).toEqual(producto.valorDia.toString());
    expect(spanEstado.textContent).toEqual(prestamo[0].estado);
    expect(spanCodigo.textContent).toEqual(producto.id.toString());
    expect(spanFechaDevo.textContent).toEqual(prestamo[0].fechaDevolucion);
  }));
});
