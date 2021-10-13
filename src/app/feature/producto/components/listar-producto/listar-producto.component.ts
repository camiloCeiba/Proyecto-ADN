import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Router } from '@angular/router';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';
import { Prestamo } from '@core/modelo/prestamo';
import { NotificationLib } from '@core/modelo/notification';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.sass']
})
export class ListarProductoComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<NotificationLib>();
  public listaProductos: Observable<Libro[]>;
  public totalPrestamos: Prestamo[] = [];
  public persona: Person;
  public objNoti: NotificationLib;
  constructor(protected generalService: GeneralService,
              protected productoService: ProductoService,
              private router: Router) {
    this.objNoti = { titulo: '', descripcion: '', tipo: '' };
  }

  ngOnInit() {
    this.listarLibros();
    this.autorizarAlquilar();
    this.persona = this.generalService.getToken();
  }

  listarLibros() {
    this.listaProductos = this.productoService.consultar();
  }

  public routerVerProducto(id: number): void {
    this.router.navigateByUrl('/producto/detalles/' + id);
  }

  alquiler(item: Libro) {
    const valor = 2;
    if (this.totalPrestamos.length === valor) {
      this.objNoti.titulo = 'Warning';
      this.objNoti.descripcion = 'No puedes reservar debido a que tienes 2 libros ya alquilados';
      this.objNoti.tipo = 'warning';
    } else {
      if (item.estado === 'Disponible') {
        this.routerAlquiler(item.id);
      } else {
        this.objNoti.titulo = 'Warning';
        this.objNoti.descripcion = 'El libro no se encuentra disponible para el alquiler';
        this.objNoti.tipo = 'warning';
      }
    }
  }

  routerAlquiler(id: number) {
    this.router.navigateByUrl('alquiler/alquiler-libro/' + id);
  }

  async autorizarAlquilar() {
    const getTotalPrestamos: Prestamo[] = await this.generalService.consultarPrestamos();
    this.totalPrestamos = getTotalPrestamos.filter(element => element.cedula === this.persona.cedula && element.estado === 'pendiente');
  }


}
