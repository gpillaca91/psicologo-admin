import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../auth/login/login.component';
import { AccesoService } from '../services/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private accesoService:AccesoService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if (this.accesoService.existeSession()) {
        // this.router.navigateByUrl('/dashboard')
        return true;
      } else {
        this.router.navigateByUrl('/login')
        return false;
      }
  }
  
}
