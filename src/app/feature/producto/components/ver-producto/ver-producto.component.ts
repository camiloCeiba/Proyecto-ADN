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
  public totalPrestamos: Prestamo[] = [];
  public id: number;
  public persona: Person;

  constructor(protected generalService: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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

  alquiler(item: Libro) {
    const valor = 2;
    if (this.totalPrestamos.length === valor) {
      alert('No puedes reservar debido a que tienes 2 libros ya alquilados');
      return false;
    }else{
      if (item.estado === 'Disponible') {
        this.routerVerProducto(item.id);
        return true;
      } else {
        alert('El libro no se encuentra disponible para el alquiler');
        return false;
      }
    }

  }

  public routerVerProducto(id: number): void {
    this.router.navigateByUrl('alquiler/alquiler-libro/' + id);
  }


  async autorizarAlquilar() {
    const getTotalPrestamos: Prestamo[] = await this.generalService.consultarPrestamos();
    this.totalPrestamos = getTotalPrestamos.filter(element => element.cedula === this.persona.cedula && element.estado === 'pendiente');
  }

}
