import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  op: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {

    this.authService.authenticated().subscribe(bool=>{
      if (bool) {   
        return this.authService.authenticated();
      } else{
        this.router.navigate(['/login']);
        return this.authService.authenticated();
      }
    });

    return this.authService.authenticated();
    
  }
}