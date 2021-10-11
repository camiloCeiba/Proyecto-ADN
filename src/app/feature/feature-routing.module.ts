import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guard/sesion/login.guard';
import { SecurityGuard } from '@core/guard/security/security.guard';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'producto',
        loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule),
        canActivate: [SecurityGuard],
      },
      {
        path: 'alquiler',
        loadChildren: () => import('./alquiler/alquiler.module').then(mod => mod.AlquilerModule),
        canActivate: [SecurityGuard],
      },
      {
        path: 'adminLibro',
        loadChildren: () => import('../feature/admin-libro/admin-libro.module').then(mod => mod.AdminLibroModule),
        canActivate: [SecurityGuard],
      },
      {
        path: 'adminPrestamo',
        loadChildren: () => import('../feature/admin-prestamo/admin-prestamo.module').then(mod => mod.AdminPrestamoModule),
        canActivate: [SecurityGuard],
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
