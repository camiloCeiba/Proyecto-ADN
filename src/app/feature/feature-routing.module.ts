import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guard/login/login.guard';
import { SecurityGuard } from '@core/guard/security/security.guard';

const routes: Routes = [
  { path: 'producto', 
    loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule),
    canActivate: [SecurityGuard],
  },
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class featureRoutingModule { }
