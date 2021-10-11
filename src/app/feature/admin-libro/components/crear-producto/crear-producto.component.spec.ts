import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CrearProductoComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LibroService } from '../../shared/service/libro.service';
import { LibrosMockService } from '@shared/data/LibrosMockService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;
  let libroService: LibroService;
  let redirectPage;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProductoComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: LibroService, ussClass: LibrosMockService }
        , HttpService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    libroService = TestBed.inject(LibroService);
    redirectPage = spyOn(component, 'redirigir');
    spyOn(libroService, 'crear').and.returnValue(
      Promise.resolve(new LibrosMockService().crear())
    );
    fixture.detectChanges();
  });

  it('should create CrearProductoComponent', () => {
    console.log('14');
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    console.log('15');
    expect(component.libroForm.valid).toBeFalsy();
  });

  it('Registrando producto', fakeAsync(() => {
    console.log('16');
    const libroNew = new LibrosMockService().crear();
    expect(component.libroForm.valid).toBeFalsy();
    component.libroForm.controls.id.setValue(libroNew.id);
    component.libroForm.controls.nombreLibro.setValue(libroNew.nombreLibro);
    component.libroForm.controls.editorial.setValue(libroNew.editorial);
    component.libroForm.controls.URL.setValue(libroNew.URL);
    component.libroForm.controls.resumen.setValue(libroNew.resumen);
    component.libroForm.controls.categoria.setValue(libroNew.categoria);
    component.libroForm.controls.fechaPublicacion.setValue(libroNew.fechaPublicacion);
    component.libroForm.controls.estado.setValue(libroNew.estado);
    component.libroForm.controls.valorDia.setValue(libroNew.valorDia);
    component.libroForm.controls.codigoLibro.setValue(libroNew.codigoLibro);
    expect(component.libroForm.valid).toBeTruthy();
    component.crear(component.libroForm.valid);
    tick(1000);
    fixture.detectChanges();
    expect(component.producto.nombreLibro).toEqual(component.libroForm.controls.nombreLibro.value);
    expect(component.producto.editorial).toEqual(component.libroForm.controls.editorial.value);
    expect(component.producto.URL).toEqual(component.libroForm.controls.URL.value);
    expect(component.producto.resumen).toEqual(component.libroForm.controls.resumen.value);
    expect(component.producto.categoria).toEqual(component.libroForm.controls.categoria.value);
    expect(component.producto.fechaPublicacion).toEqual(component.libroForm.controls.fechaPublicacion.value);
    expect(component.producto.estado).toEqual(component.libroForm.controls.estado.value);
    expect(component.producto.valorDia).toEqual(component.libroForm.controls.valorDia.value);
    expect(component.producto.codigoLibro).toEqual(component.libroForm.controls.codigoLibro.value);
    expect(redirectPage).toHaveBeenCalled();
    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  }));
});
