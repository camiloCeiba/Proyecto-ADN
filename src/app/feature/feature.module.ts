import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    FeatureRoutingModule,
    CommonModule,
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModule { }
