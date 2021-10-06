import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ProductoRoutingModule } from './producto-routing.module';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { ProductoService } from './shared/service/producto.service';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';


@NgModule({
  declarations: [
    ListarProductoComponent,
    ProductoComponent,
    VerProductoComponent
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule
  ],
  providers: [ProductoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductoModule { }
