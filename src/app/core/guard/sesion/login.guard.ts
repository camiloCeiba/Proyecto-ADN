import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { GeneralService } from '@shared/services/general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private generalService: GeneralService, private router: Router){
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.generalService.getToken()){
      this.router.navigate(['/producto/listar']);
      return false;
    } else {
      return true;
    }
  }
}
