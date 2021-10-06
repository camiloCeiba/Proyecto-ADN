import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLibroRoutingModule } from './alquiler-routing.module';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { LibroService } from './shared/service/libro.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrearProductoComponent],
  imports: [
    CommonModule,
    AdminLibroRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LibroService]
})
export class AdminLibroModule { }
