import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPrestamosComponent } from './components/list-prestamos/list-prestamos.component';
import { AdminPrestamoRoutingModule } from './alquiler-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ListPrestamosComponent],
  imports: [
    CommonModule,
    AdminPrestamoRoutingModule,
    SharedModule
  ],
})
export class AdminPrestamoModule { }
