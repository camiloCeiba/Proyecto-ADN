import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LoginSesion } from '../../model/login';

@Injectable()
export class LoginService {

  constructor(protected http: HttpService) { }

  public login(): Promise<LoginSesion> {
    return new Promise((resolve) => {
      this.http.doGet<LoginSesion>(`${environment.API}/login_admin`, this.http.optsName('login')).subscribe(data => {
        resolve(data);
      });
    });
  }
}
