import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';

@Component({
  selector: 'app-list-prestamos',
  templateUrl: './list-prestamos.component.html',
  styleUrls: ['./list-prestamos.component.sass']
})
export class ListPrestamosComponent implements OnInit {

  public producto: Libro;
  public id: string;
  public totalPrestamos: Prestamo[];
  public totalLibros: Libro[] = [];
  public persona: Person;
  constructor(protected generalService: GeneralService, private router: Router) {
    this.producto = {nombreLibro: '',
                    id: null,
                    editorial: '',
                    resumen: '',
                    categoria: '',
                    URL: '',
                    estado: '',
                    fechaPublicacion: null,
                    valorDia: null,
                    codigoLibro: null
                  };
  }

  async ngOnInit() {
    this.persona = this.generalService.getToken();
    this.autorizarAlquilar();
  }

  routerAlquiler(id: number) {
    this.router.navigateByUrl('alquiler/alquiler-libro/' + id);
  }

  async listLibros(id: number): Promise<Libro> {
    return this.generalService.consultarId(id);
  }

  async autorizarAlquilar() {
    const getTotalPrestamos: Prestamo[] = await this.generalService.consultarPrestamos();
    this.totalPrestamos = getTotalPrestamos.filter((element: Prestamo) => {
        const fechaFinal = new Date(element.fechaDevolucion);
        const fechaAcual = new Date().getTime();
        const mes = 1000;
        const minutos = 60;
        const segundos = 60;
        const horas = 24;
        const multa = 100;
        element.multa = (fechaAcual - fechaFinal.getTime()) / (mes * minutos * segundos * horas) ?
        Math.trunc((fechaAcual - fechaFinal.getTime()) / (mes * minutos * segundos * horas)) * multa  : 0;
        return element.cedula;
    });

    this.totalPrestamos.forEach(async (element) => {
        this.totalLibros.push(Object.assign(await this.listLibros(element.codigoLibro), element));
    });
  }
}
