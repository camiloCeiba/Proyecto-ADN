import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlquilerLibroComponent } from './components/alquiler-libro/alquiler-libro.component';
import { ListAlquilerComponent } from './components/list-alquiler/list-alquiler.component';


const routes: Routes = [
  {
    path: 'alquiler-libro/:id',
    component: AlquilerLibroComponent
  },
  {
    path: 'lista-alquiler',
    component: ListAlquilerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlquilerRoutingModule { }
