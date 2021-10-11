import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Router } from '@angular/router';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';
import { Prestamo } from '@core/modelo/prestamo';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.sass']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Libro[]>;
  public totalPrestamos: Prestamo[] = [];
  public persona: Person;

  constructor(protected generalService: GeneralService, protected productoService: ProductoService, private router: Router) { }

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
      alert('No puedes reservar debido a que tienes 2 libros ya alquilados');
    } else {
      if (item.estado === 'Disponible') {
        this.routerAlquiler(item.id);
      } else {
        alert('El libro no se encuentra disponible para el alquiler');
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
