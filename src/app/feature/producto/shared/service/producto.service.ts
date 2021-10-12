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
}
