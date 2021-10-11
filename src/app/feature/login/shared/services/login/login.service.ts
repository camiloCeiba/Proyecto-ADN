import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { LoginSesion } from '../../model/login';

@Injectable()
export class LoginService {

  constructor(protected http: HttpService) { }

  public login(type: string): Promise<LoginSesion[]> {
    return new Promise((resolve) => {
      this.http.doGet<LoginSesion[]>(`${environment.API}/${type}`, this.http.optsName('login')).subscribe(data => {
        resolve(data);
      });
    });
  }
}
