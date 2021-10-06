import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Libro } from '@core/modelo/producto';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Libro[]>(`${environment.API}/libro`, this.http.optsName('consultar libros'));
  }

  public crear(libro: Libro): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.doPost<Libro, boolean>(`${environment.API}/libro`, libro, this.http.optsName('crear libro')).subscribe(data => {
        resolve(data);
      });
    });
  }
}
