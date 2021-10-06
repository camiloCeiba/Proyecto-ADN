import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';


const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    children: [
      {
        path: 'listar',
        component: ListarProductoComponent
      },
      {
        path: 'detalles/:id',
        component: VerProductoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
