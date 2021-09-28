import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductoService } from '@producto/shared/service/producto.service';
import { Libro } from '@producto/shared/model/producto';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.sass']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Libro[]>;

  constructor(protected productoService: ProductoService) { }

  ngOnInit() {
    this.listaProductos = this.productoService.consultar();
    console.log(this.listaProductos);
  }

  listarLibros(){
    this.listaProductos = this.productoService.consultar();
  }

}
