import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPrestamosComponent } from './components/list-prestamos/list-prestamos.component';



const routes: Routes = [
  {
    path: 'list',
    component: ListPrestamosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPrestamoRoutingModule { }
