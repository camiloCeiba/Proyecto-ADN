import { Injectable } from '@angular/core';
import { Libro } from '@core/modelo/producto';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Prestamo } from '../../../../core/modelo/prestamo';

@Injectable()
export class AlquilerService {

    constructor(protected http: HttpService) { }

    public crear(libro: Prestamo): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.doPost<Prestamo, boolean>(`${environment.API}/prestamo`, libro, this.http.optsName('Prestamo')).subscribe(data => {
                resolve(data);
            });
        });
    }

    public actualizar(libro: Libro): Promise<Libro> {
        return new Promise((resolve) => {
            this.http.doPut<Libro, Libro>(`${environment.API}/libro/${libro.id}`, libro,
            this.http.optsName('update')).subscribe(data => {
                resolve(data);
            });
        });
    }

    public actualizarPrestamo(prestamo: Prestamo): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.doPut<Prestamo, boolean>(`${environment.API}/prestamo/${prestamo.id}`, prestamo,
            this.http.optsName('update')).subscribe(data => {
                resolve(data);
            });
        });
    }
}
