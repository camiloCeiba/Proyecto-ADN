import { Injectable } from '@angular/core';
import { Libro } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LibroService {

constructor(protected http: HttpService) {}

public crear(libro: Libro): Promise<Libro> {
  return new Promise((resolve) => {
    this.http.doPost<Libro, Libro>(`${environment.API}/libro`, libro, this.http.optsName('crear libro')).subscribe(data => {
      resolve(data);
    });
  });
}
}
