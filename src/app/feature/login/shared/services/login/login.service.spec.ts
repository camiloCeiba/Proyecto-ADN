/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed} from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { LoginMockService } from '@shared/data/login-mock.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

describe('Service: Login', () => {
  let httpMock: HttpTestingController;
  let service: LoginService;
  const apiLibros = `${environment.API}/login_admin`;
  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  it('El componente se creo de forma exitosa', () => {
    console.log('19');
    const loginService: LoginService = TestBed.inject(LoginService);
    expect(loginService).toBeTruthy();
  });


  it('Deberia traer usuario admin', fakeAsync(() => {
    console.log('20');
    const token = new LoginMockService().login();
    service.login('login_admin').then(user => {
      expect(user).toEqual(token);
    });
    const req = httpMock.expectOne(apiLibros);
    expect(req.request.method).toBe('GET');
    req.flush(token);
  }));
});
