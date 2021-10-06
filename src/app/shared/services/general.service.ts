import { Injectable } from '@angular/core';
import { Libro, Person } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { Prestamo } from '@core/modelo/prestamo';
import { environment } from 'src/environments/environment';

@Injectable()
export class GeneralService {

  constructor(protected http: HttpService) { }

  setToken(token) {
    try {
      return localStorage.setItem('token', token);
    } catch (error) {
      localStorage.clear();
    }
  }

  getToken(): Person {
    try {
      return JSON.parse(atob(localStorage.getItem('token')));
    } catch (error) {
      localStorage.clear();
    }
  }

  public consultarId(id: number): Promise<Libro> {
    return new Promise((resolve) => {
      return this.http.doGet<Libro>(`${environment.API}/libro/${id}`, this.http.optsName('consultar libro')).subscribe(data => {
        resolve(data);
      });
    });
  }

  public consultarPrestamos(): Promise<Prestamo[]> {
    return new Promise((resolve) => {
      return this.http.doGet<Prestamo[]>(`${environment.API}/prestamo`, this.http.optsName('consultar prestamos')).subscribe(data => {
        resolve(data);
      });
    });
  }
}
