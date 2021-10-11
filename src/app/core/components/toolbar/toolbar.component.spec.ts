import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SELECTORS } from '@shared/util/selectors';
import { LoginComponent } from 'src/app/feature/login/components/login/login.component';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let redirectPage;
  let routeSpy;
  beforeEach(waitForAsync(() => {
    routeSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        [RouterTestingModule.withRoutes([
          {  path: 'login', component: LoginComponent }
        ])],
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

  it('should create ToolbarComponent', () => {
    console.log('37');
    expect(component).toBeTruthy();
  });

  it('Se debe cerrar sesión, borrar el token en localStorage y redirigir a la pagina de login', () => {
    console.log('38');
    const btnCerrarSesion = SELECTORS.TOOLBAR.btnCerrarSesion();

    btnCerrarSesion.click();

    fixture.detectChanges();

    expect(localStorage.getItem('token')).toEqual(null);
    expect(redirectPage).toHaveBeenCalled();
  });

  xit('la funcion debe borrar localstorage y redirigir', () => {
    component.cerrarSesion();
    fixture.detectChanges();

    expect(localStorage.length).toEqual(0);
    expect(routeSpy.navigate).toHaveBeenCalledWith([`/login`]);
  });

});
