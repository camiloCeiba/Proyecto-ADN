import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { GeneralService } from '@shared/services/general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private generalService: GeneralService, private router: Router){
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.generalService.getToken()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
