import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarProductoComponent } from './listar-producto.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoService } from '../../shared/service/producto.service';
import { HttpService } from 'src/app/core/services/http.service';
import { GeneralService } from '@shared/services/general.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { ProductoMockService } from '@shared/data/productoMockService';
import { SELECTORS } from '@shared/util/selectors';
import { Router } from '@angular/router';
import { VerProductoComponent } from '../ver-producto/ver-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListarProductoComponent', () => {
  let component: ListarProductoComponent;
  let fixture: ComponentFixture<ListarProductoComponent>;
  let productoService: ProductoService;
  let generalService: GeneralService;
  let redirectPage;
  let redirectPageAlqular;
  let routeSpy;
  beforeEach(waitForAsync(() => {
    routeSpy = {navigate: jasmine.createSpy('navigateByUrl')};
    TestBed.configureTestingModule({
      declarations: [ListarProductoComponent, VerProductoComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        [RouterTestingModule.withRoutes([
          {  path: 'detalles/:id', component: VerProductoComponent }
      ])],
      ],
      providers: [
        { provide: GeneralService, useclass: GeneralMockService },
        { provide: ProductoService, useclass: ProductoMockService },
        { provide: Router, useValue: routeSpy },
        HttpService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    generalService = TestBed.inject(GeneralService);
    spyOn(productoService, 'consultar').and.returnValue(
      of(new ProductoMockService().consultar())
    );
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    component.ngOnInit();
    redirectPage = spyOn(component, 'routerVerProducto');
    redirectPageAlqular = spyOn(component, 'routerAlquiler');
    fixture.detectChanges();
  });

  it('Se creo ListarProductoComponent', () => {
    console.log('23');
    expect(component).toBeTruthy();
  });

  it('La funcion se ejecuta correctamente', fakeAsync(() => {
    console.log('24');
    const producto = new ProductoMockService().consultar();
    component.listarLibros();
    tick(1000);
    fixture.detectChanges();
    component.listaProductos.subscribe(resultado => {
      expect(resultado).toEqual(producto);
    });
  }));

  it('La lista se llena con la informacion', fakeAsync(() => {
    console.log('25');
    const i = 0;
    component.listarLibros();
    tick(1000);
    fixture.detectChanges();
    const strongNombreLibro = SELECTORS.LISTPRODUCTO.strongNombreLibro(i);
    const imageURL = SELECTORS.LISTPRODUCTO.imageURL(i);
    const spanResumen = SELECTORS.LISTPRODUCTO.spanResumen(i);
    const strongEstado = SELECTORS.LISTPRODUCTO.strongEstado(i);
    const producto = new ProductoMockService().consultar();
    expect(strongNombreLibro.textContent).toEqual(producto[0].nombreLibro);
    expect(imageURL.src).toEqual(producto[0].URL);
    expect(spanResumen.textContent).toEqual(producto[0].resumen);
    expect(strongEstado.textContent).toEqual(producto[0].estado);
  }));

  it('Redirigir al componente ver-producto de id 1', fakeAsync(() => {
    console.log('26');
    const i = 0;
    component.listarLibros();
    tick(1000);
    fixture.detectChanges();
    const buttonVer = SELECTORS.LISTPRODUCTO.buttonVer(i);
    buttonVer.click();
    expect(redirectPage).toHaveBeenCalled();
  }));

  it('No permite alquilar si ya tiene dos libros alquilados', fakeAsync(() => {
    console.log('27');
    const i = 1;
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.totalPrestamos.push(prestamo[0]);
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.LISTPRODUCTO.buttonAlquilar(i);
    buttonAlquilar.click();

    expect(redirectPageAlqular).not.toHaveBeenCalled();
  }));

  it('No permite alquilar si el libro esta ocupado', fakeAsync(() => {
    console.log('28');
    const i = 1;
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.listarLibros();
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.LISTPRODUCTO.buttonAlquilar(i);
    buttonAlquilar.click();

    expect(redirectPageAlqular).not.toHaveBeenCalled();
  }));

  it('Si cumple se debe enviar a alquilar el libro', fakeAsync(() => {
    console.log('29');
    const i = 0;
    const prestamo = new GeneralMockService().consultarPrestamos();
    component.totalPrestamos.push(prestamo[0]);
    component.listarLibros();
    tick(1000);
    fixture.detectChanges();
    const buttonAlquilar = SELECTORS.LISTPRODUCTO.buttonAlquilar(i);
    buttonAlquilar.click();

    expect(redirectPageAlqular).toHaveBeenCalled();
  }));

  it('El total de libros prestados debe ser igual a dos', fakeAsync(() => {
    console.log('30');
    const prestamo = new GeneralMockService().consultarPrestamos();
    const persona = new GeneralMockService().getToken();
    spyOn(generalService, 'consultarPrestamos').and.returnValue(
      Promise.resolve(prestamo)
    );
    component.persona = persona;
    tick(1000);
    component.autorizarAlquilar();
    tick(1000);
    fixture.detectChanges();
    console.log(component.totalPrestamos.length);
    expect(component.totalPrestamos.length).toEqual(2);
  }));

  xit('Se redirige al entrar en la funcion', () => {
    const valor = 1;
    component.routerVerProducto(valor);
    fixture.detectChanges();
    expect(redirectPageAlqular).toHaveBeenCalled();
    expect(routeSpy.navigate).toHaveBeenCalledWith([`/producto/detalles/${valor}`]);
  });

});
