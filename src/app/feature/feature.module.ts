import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { featureRoutingModule } from './feature-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    featureRoutingModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModule { }
