import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { GeneralService } from '@shared/services/general.service';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let generalService: GeneralService;
  let loginGuard: LoginGuard;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: GeneralService, ussClass: GeneralMockService },
        { provide: Router, useValue: router },
        LoginGuard, HttpService
      ]
    });
  });

  beforeEach(() => {
    generalService = TestBed.inject(GeneralService);
    loginGuard = TestBed.inject(LoginGuard);
  });

  it('El usuario no se ha logueado y lo mantiene en el login', () => {
    console.log('41');
    expect(loginGuard.canActivate()).toBe(true);
  });
  it('El usuario se ha logueado previamente, lo lleva a la vista general', () => {
    console.log('42');
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    expect(loginGuard.canActivate()).toBe(false);
  });

});
