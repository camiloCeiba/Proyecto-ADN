import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.sass']
})
export class VerProductoComponent implements OnInit {

  public producto: Libro;
  public totalPrestamos: Prestamo[];
  public id: number;
  public persona: Person;

  constructor(protected generalService: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.producto = {
      nombreLibro: '',
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
    this.producto = await this.generalService.consultarId(this.id);
    this.persona = this.generalService.getToken();
    this.autorizarAlquilar();
  }

  routerAlquiler(item: Libro) {
    if (this.totalPrestamos.length === 2) {
      alert('No puedes reservar debido a que tienes 2 libros ya alquilados');
      return;
    }
    if (item.estado === 'Disponible') {
      this.router.navigateByUrl('alquiler/alquiler-libro/' + item.id);
    } else {
      alert('El libro no se encuentra disponible para el alquiler');
    }
  }

  async autorizarAlquilar() {
    const getTotalPrestamos: Prestamo[] = await this.generalService.consultarPrestamos();
    this.totalPrestamos = getTotalPrestamos.filter(element => element.cedula === this.persona.cedula && element.estado === 'pendiente');
  }

}
