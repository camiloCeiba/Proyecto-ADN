import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { eventInput } from '@shared/util/event-input';
import { SELECTORS } from '@shared/util/selectors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { LoginMockService } from '@shared/data/login-mock.service';
import { LoginService } from '../../shared/services/login/login.service';
import { GeneralService } from '@shared/services/general.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { Router } from '@angular/router';

const routeSpy = {navigate: jasmine.createSpy('navigate')};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let redirectPage;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: LoginService, useclass: LoginMockService },
        { provide: GeneralService, useclass: GeneralMockService },
        { provide: Router, useValue: routeSpy },
        HttpService
      ],
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
    console.log('21');
    const inputUsername = SELECTORS.LOGIN.inputUsername();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();

    const username = null;
    const password = null;

    let usernameError: HTMLSpanElement;
    let passwordError: HTMLDivElement;

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

  it('Se debe iniciar sesión, almacenar el token en localStorage y redirigir a la pagina listar', fakeAsync(() => {
    console.log('22');
    const inputUsername = SELECTORS.LOGIN.inputUsername();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();
    component.formLogin.get('type').setValue('login_admin');
    const username = 'Daniel';
    const password = 'Daniel1025';
    const token = new LoginMockService().login();
    eventInput(inputUsername, username);
    eventInput(inputPassword, password);
    const spyLogin = spyOn(loginService, 'login').and.returnValue(
      Promise.resolve(token)
    );


    btnLogin.click();
    fixture.detectChanges();
    tick(1000);
    expect(spyLogin).toHaveBeenCalled();
  }));

  it('Redirige al tener lleno el formulario', fakeAsync(() => {
    console.log('43');
    component.formLogin.get('loginUser').setValue('Daniel');
    component.formLogin.get('loginPassword').setValue('Daniel1025');
    component.formLogin.get('type').setValue('login_admin');

    const token = new LoginMockService().login();
    const spyLogin = spyOn(loginService, 'login').and.returnValue(
      Promise.resolve(token)
    );

    component.login(true);

    fixture.detectChanges();
    tick(1000);
    expect(spyLogin).toHaveBeenCalled();
    expect(redirectPage).not.toHaveBeenCalled();
  }));


  it('La contraseña debe ser minimo de 9 caracteres', fakeAsync(() => {
    console.log('44');
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();

    const password = 'Daniel10';

    let passwordError: HTMLDivElement;

    eventInput(inputPassword, password);
    btnLogin.click();

    fixture.detectChanges();
    passwordError = SELECTORS.LOGIN.inputPasswordError();


    expect(passwordError.textContent).toContain('La cantidad de caracteres debe ser minimo 9');
  }));

});
