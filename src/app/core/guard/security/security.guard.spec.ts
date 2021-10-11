import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { GeneralMockService } from '@shared/data/generalMockService';
import { GeneralService } from '@shared/services/general.service';
import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  let generalService: GeneralService;
  let securityGuard: SecurityGuard;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: GeneralService, ussClass: GeneralMockService },
        { provide: Router, useValue: router },
        SecurityGuard, HttpService
      ]
    });
  }));

  beforeEach(() => {
    generalService = TestBed.inject(GeneralService);
    securityGuard = TestBed.inject(SecurityGuard);
  });

  it('Poder acceder a la ruta cuando el usuario está conectado', () => {
    spyOn(generalService, 'getToken').and.returnValue(
      new GeneralMockService().getToken()
    );
    expect(securityGuard.canActivate()).toBe(true);
  });

  it('No poder acceder a la ruta cuando el usuario no está conectado', () => {
    expect(securityGuard.canActivate()).toBe(false);
  });

  xit('Se redirige al entrar en la funcion', () => {
    expect(router.navigate).toHaveBeenCalledWith(['/producto/listar']);
  });
});
