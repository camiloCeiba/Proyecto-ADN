import { AlquilerService } from '@alquiler//shared/service/alquiler.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { AlquilerMockService } from '@shared/data/alquilerMockService';
import { GeneralMockService } from '@shared/data/generalMockService';
import { GeneralService } from '@shared/services/general.service';
import { eventInput } from '@shared/util/event-input';
import { SELECTORS } from '@shared/util/selectors';

import { AlquilerLibroComponent } from './alquiler-libro.component';

describe('AlquilerLibroComponent', () => {
  let component: AlquilerLibroComponent;
  let fixture: ComponentFixture<AlquilerLibroComponent>;
  let redirectPage;
  let redirectPageCambios;
  let routeSpy;
  let generalService: GeneralService;
  let alquilerService: AlquilerService;
  beforeEach(waitForAsync(() => {
    routeSpy = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [AlquilerLibroComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: GeneralService, ussClass: GeneralMockService },
        { provide: AlquilerService, ussClass: AlquilerMockService },
        { provide: Router, useValue: routeSpy },
        {
          provide: ActivatedRoute,
          useValue:
          {
            snapshot: {
              paramMap: convertToParamMap({ id: 10 })
            }
          }
        },
        HttpService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquilerLibroComponent);
    component = fixture.componentInstance;
    component.persona = new GeneralMockService().getToken();
    component.id = 10;
    redirectPage = spyOn(component, 'redirigir');
    redirectPageCambios = spyOn(component, 'calcularValor');
    alquilerService = TestBed.inject(AlquilerService);
    generalService = TestBed.inject(GeneralService);
    fixture.detectChanges();
  });

  it('should create AlquilerLibroComponent', () => {
    console.log('1');
    expect(component).toBeTruthy();
  });

  it('Datos vacios, no permite guardar, ni redirigir', () => {
    console.log('2');
    const inputCodigoLibro = SELECTORS.ALQUILER.inputCodigoLibro();
    const inputFechaInicial = SELECTORS.ALQUILER.inputFechaInicial();
    const inputFechaFinal = SELECTORS.ALQUILER.inputFechaFinal();
    const inputCedula = SELECTORS.ALQUILER.inputCedula();
    const inputValorTotal = SELECTORS.ALQUILER.inputValorTotal();
    const Buttonlquiler = SELECTORS.ALQUILER.ButtonAlquiler();

    const codigoLibro = null;
    const fechaInicial = null;
    const fechaFinal = null;
    const cedula = null;
    const valorTotal = null;

    eventInput(inputCodigoLibro, codigoLibro);
    eventInput(inputFechaInicial, fechaInicial);
    eventInput(inputFechaFinal, fechaFinal);
    eventInput(inputCedula, cedula);
    eventInput(inputValorTotal, valorTotal);

    Buttonlquiler.click();

    fixture.detectChanges();
    expect(redirectPage).not.toHaveBeenCalled();
  });

  it('crear alquiler de libro', fakeAsync(() => {
    console.log('3');
    const alquiler = new AlquilerMockService().crear();
    const libro = new AlquilerMockService().actualizar();
    component.alquilerForm.controls.id.setValue(alquiler.id);
    component.alquilerForm.controls.cedula.setValue(alquiler.cedula);
    component.alquilerForm.controls.fechaAlquiler.setValue(alquiler.fechaAlquiler);
    component.alquilerForm.controls.fechaDevolucion.setValue(alquiler.fechaDevolucion);
    component.alquilerForm.controls.valorTotal.setValue(alquiler.valorTotal);
    component.alquilerForm.controls.codigoLibro.setValue(alquiler.codigoLibro);
    component.alquilerForm.controls.estado.setValue(alquiler.estado);
    expect(component.alquilerForm.valid).toBeTruthy();
    component.producto = libro;
    spyOn(alquilerService, 'crear').and.returnValue(
      Promise.resolve(alquiler)
    );
    spyOn(alquilerService, 'actualizar').and.returnValue(
      Promise.resolve(libro)
    );
    component.crear(component.alquilerForm.valid);
    tick(1000);
    fixture.detectChanges();
    expect(component.prestamo.cedula).toEqual(component.alquilerForm.controls.cedula.value);
    expect(component.prestamo.fechaAlquiler).toEqual(component.alquilerForm.controls.fechaAlquiler.value);
    expect(component.prestamo.fechaDevolucion).toEqual(component.alquilerForm.controls.fechaDevolucion.value);
    expect(component.prestamo.valorTotal).toEqual(component.alquilerForm.controls.valorTotal.value);
    expect(component.prestamo.codigoLibro).toEqual(component.alquilerForm.controls.codigoLibro.value);
    expect(component.prestamo.estado).toEqual(component.alquilerForm.controls.estado.value);
    expect(redirectPage).toHaveBeenCalled();
  }));

  it('Trae el libro por el id', fakeAsync(() => {
    console.log('4');
    const libro = new GeneralMockService().consultarId();
    spyOn(generalService, 'consultarId').and.returnValue(
      Promise.resolve(libro)
    );
    component.getLibro();
    tick(1000);
    fixture.detectChanges();
    expect(component.producto.categoria).toEqual(libro.categoria);
    expect(component.producto.URL).toEqual(libro.URL);
    expect(component.producto.editorial).toEqual(libro.editorial);
    expect(component.producto.estado).toEqual(libro.estado);
  }));

  it('Si la fecha es un domingo no permite reservar libro', fakeAsync(() => {
    console.log('5');
    const inputFechaInicial = SELECTORS.ALQUILER.inputFechaInicial();
    const fechaInicial = '2021-10-10';
    eventInput(inputFechaInicial, fechaInicial);
    expect(redirectPageCambios).not.toHaveBeenCalled();
  }));

  it('fecha final no debe ser mejor a la inicial', fakeAsync(() => {
    console.log('6');
    const fechaInicial = new Date('2021-10-11');
    const fechaFinal = new Date('2021-10-09');
    component.calcularValor(fechaInicial, fechaFinal);
    tick(1000);
    fixture.detectChanges();
    expect(component.alquilerForm.controls.valorTotal.value).toEqual('');
  }));

});
