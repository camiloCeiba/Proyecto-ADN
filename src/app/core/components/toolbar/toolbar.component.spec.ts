import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SELECTORS } from '@shared/util/selectors';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let redirectPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    redirectPage = spyOn(component, 'cerrarSesion');
    localStorage.clear();
    fixture.detectChanges();
  });

  it('Se debe iniciar sesión, almacenar el token en localStorage y redirigir a la pagina listar', () => {
    const btnCerrarSesion = SELECTORS.TOOLBAR.btnCerrarSesion();

    btnCerrarSesion.click();

    fixture.detectChanges();

    expect(localStorage.getItem('token')).toEqual(null);
    expect(redirectPage).toHaveBeenCalled();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
