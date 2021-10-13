import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerService } from './shared/service/alquiler.service';
import { AlquilerLibroComponent } from './components/alquiler-libro/alquiler-libro.component';
import { AlquilerRoutingModule } from './alquiler-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListAlquilerComponent } from './components/list-alquiler/list-alquiler.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
@NgModule({
  declarations: [
    AlquilerLibroComponent,
    ListAlquilerComponent
  ],
  imports: [
    CommonModule,
    AlquilerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule
  ],
  providers: [AlquilerService]
})
export class AlquilerModule { }
