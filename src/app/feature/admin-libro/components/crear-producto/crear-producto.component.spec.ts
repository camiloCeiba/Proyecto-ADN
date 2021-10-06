import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProductoComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LibroService } from '../../shared/service/libro.service';
describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;
  let libroService: LibroService;
  // let redirectPage;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProductoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [LibroService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    libroService = TestBed.inject(LibroService);
    // redirectPage = spyOn(component, 'redirigir');
    spyOn(libroService, 'crear').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.libroForm.valid).toBeFalsy();
  });
  it('Registrando producto', () => {
    expect(component.libroForm.valid).toBeFalsy();
    component.libroForm.controls.id.setValue(99);
    component.libroForm.controls.nombreLibro.setValue('Libro test');
    component.libroForm.controls.editorial.setValue('editorial Test');
    component.libroForm.controls.URL.setValue('URL test');
    component.libroForm.controls.resumen.setValue('resumen test');
    component.libroForm.controls.categoria.setValue('categoria test');
    component.libroForm.controls.fechaPublicacion.setValue(1905);
    component.libroForm.controls.estado.setValue('Disponible');
    component.libroForm.controls.valorDia.setValue(700);
    component.libroForm.controls.codigoLibro.setValue(24587);
    expect(component.libroForm.valid).toBeTruthy();

    component.crear(component.libroForm.valid);
    // expect(redirectPage).toHaveBeenCalled();
    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
