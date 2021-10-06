import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';
import * as moment from 'moment';
import { AlquilerService } from '../../shared/service/alquiler.service';

@Component({
  selector: 'app-list-alquiler',
  templateUrl: './list-alquiler.component.html',
  styleUrls: ['./list-alquiler.component.sass']
})
export class ListAlquilerComponent implements OnInit {

  public producto: Libro;
  public id: string;
  public totalPrestamos: Prestamo[];
  public totalLibros: Libro[] = [];
  public persona: Person;
  constructor(protected generalService: GeneralService, private router: Router, public alquilerService: AlquilerService) {
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

  devolverLibro(libro) {
    const bodyPrestamo: Prestamo = {
      id: libro.id,
      cedula: libro.cedula,
      fechaAlquiler: libro.fechaAlquiler,
      fechaDevolucion: libro.fechaDevolucion,
      valorTotal: libro.valorTotal,
      codigoLibro: libro.codigoLibro,
      estado: 'pagado',
      multa: libro.multa,
    };
    this.actualizarPrestamo(bodyPrestamo);
  }

  async actualizarPrestamo(body: Prestamo){
    await this.alquilerService.actualizarPrestamo(body);
    const libro = await this.listLibros(body.codigoLibro);
    libro.estado = 'Disponible';
    await this.alquilerService.actualizar(libro);
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
      if (element.cedula === this.persona.cedula && element.estado === 'pendiente') {
        const fechaFinal = moment(element.fechaDevolucion);
        const fechaAcual = moment();
        element.multa = fechaAcual.diff(fechaFinal, 'days') ? fechaAcual.diff(fechaFinal, 'days') * 100 : 0;
        return element.cedula;
      }
    });

    this.totalPrestamos.forEach(async (element) => {
        this.totalLibros.push(Object.assign(await this.listLibros(element.codigoLibro), element));
    });
  }
}
