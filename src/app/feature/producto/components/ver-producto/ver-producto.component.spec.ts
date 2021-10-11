/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { GeneralService } from '@shared/services/general.service';
import { SELECTORS } from '@shared/util/selectors';
import { VerProductoComponent } from './ver-producto.component';

describe('VerProductoComponent', () => {
  let component: VerProductoComponent;
  let fixture: ComponentFixture<VerProductoComponent>;
  let generalService: GeneralService;
  let routeSpy;
  let redirectPage;
  beforeEach(waitForAsync(() => {
    routeSpy = {navigate: jasmine.createSpy('navigateByUrl')};
    TestBed.configureTestingModule({
      declarations: [ VerProductoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GeneralService, useclass: GeneralMockService },
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
        HttpService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProductoComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
    redirectPage = spyOn(component, 'routerVerProducto');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se trae la informacion del primer libro con id 1', fakeAsync(() => {
    component.id = 1;
    const libro  = new GeneralMockService().consultarId();
    spyOn(generalService, 'consultarId').and.returnValue(
      Promise.resolve(libro)
    );
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    spyOn(generalService, 'consultarPrestamos').and.returnValue(
      Promise.resolve(new GeneralMockService().consultarPrestamos())
    );
    component.ngOnInit();
    tick(1000);


    fixture.detectChanges();
    const inputSpanEditorial = SELECTORS.VERPRODUCTO.inputSpanEditorial();
    const inputSpanCategoria = SELECTORS.VERPRODUCTO.inputSpanCategoria();
    const inputSpanFecha = SELECTORS.VERPRODUCTO.inputSpanFecha();
    const inputSpanEstado = SELECTORS.VERPRODUCTO.inputSpanEstado();
    const inputSpanValorDia = SELECTORS.VERPRODUCTO.inputSpanValorDia();
    const inputSpanCodigoLibro = SELECTORS.VERPRODUCTO.inputSpanCodigoLibro();

    expect(inputSpanEditorial.textContent).toEqual(libro.editorial);
    expect(inputSpanCategoria.textContent).toEqual(libro.categoria);
    expect(inputSpanFecha.textContent).toEqual(libro.fechaPublicacion.toString());
    expect(inputSpanEstado.textContent).toEqual(libro.estado);
    expect(inputSpanValorDia.textContent).toEqual(libro.valorDia.toString());
    expect(inputSpanCodigoLibro.textContent).toEqual(libro.codigoLibro.toString());
  }));

  it('No permite alquilar si ya tiene dos libros alquilados detalle', fakeAsync(() => {
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.totalPrestamos.push(prestamo[0]);
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.VERPRODUCTO.buttonAlquilar();
    buttonAlquilar.click();

    expect(redirectPage).not.toHaveBeenCalled();
  }));

  xit('aNo permite alquilar si el libro esta ocupado detalle', fakeAsync(() => {
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.producto = new GeneralMockService().consultarId();
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.VERPRODUCTO.buttonAlquilar();
    buttonAlquilar.click();

    expect(redirectPage).not.toHaveBeenCalled();
  }));

  it('LLama la funcion si cumple', fakeAsync(() => {
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.producto = new GeneralMockService().consultarId();
    component.producto.estado = 'Disponible';
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.VERPRODUCTO.buttonAlquilar();
    buttonAlquilar.click();

    expect(redirectPage).toHaveBeenCalled();
  }));
});
