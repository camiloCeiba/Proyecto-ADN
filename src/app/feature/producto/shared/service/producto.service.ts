import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Libro } from '../model/producto';


@Injectable()
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Libro[]>(`${environment.API}/Libros`, this.http.optsName('consultar libros'));
  }

  public crear(libro: Libro) {
    return this.http.doPost<Libro, boolean>(`${environment.API}/Libros`, libro, this.http.optsName('crear libro'));
  }

  public eliminar(libro: Libro) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${libro.codigoLibro}`,
                                                 this.http.optsName('eliminar productos'));
  }
}
