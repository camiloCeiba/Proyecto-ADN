import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { eventInput } from '@shared/util/event-input';
import { SELECTORS } from '@shared/util/selectors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from '../shared/services/login/login.service';
import { LoginMockService } from '@shared/data/login-mock.service';
import { SecurityGuard } from '@core/guard/security/security.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let redirectPage;
  let loginService: LoginService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: LoginService, useClass: LoginMockService
        },
        SecurityGuard
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    redirectPage = spyOn(component, 'redirigir');
    localStorage.clear();
    fixture.detectChanges();
  });

  it('Error por username y password vacio', () => {
    const inputUsername = SELECTORS.LOGIN.inputUsername();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();

    const username = null;
    const password = null;

    let usernameError : HTMLSpanElement;
    let passwordError : HTMLDivElement;

    eventInput(inputUsername, username);
    eventInput(inputPassword, password);
    
    btnLogin.click();

    fixture.detectChanges();
    usernameError = SELECTORS.LOGIN.inputUsernameError();
    passwordError = SELECTORS.LOGIN.inputPasswordError();


    expect(usernameError.textContent).toContain('Username es requerido');
    expect(passwordError.textContent).toContain('Password es requerido');
    expect(localStorage.getItem('token')).toBeNull();
    expect(redirectPage).not.toHaveBeenCalled();
  });

  it('Se debe iniciar sesión, almacenmar el token en localStorage y redirigir a la pagina listar', fakeAsync(() => {
    const inputUsername = SELECTORS.LOGIN.inputUsername();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();

    const username = 'Daniel';
    const password = 'Daniel1025';

    const spyLogin = spyOn(loginService, 'login').and.callThrough();
    const { token } = new LoginMockService().login();

    eventInput(inputUsername, username);
    eventInput(inputPassword, password);
    btnLogin.click();
    
    fixture.detectChanges();
    tick(1000);

    expect(spyLogin).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toEqual(token);
    expect(redirectPage).toHaveBeenCalled();
  }));
});
