import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './core/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const nextUrl = state.url;
    const isLoggedIn = this.loginService.isUserLoggedIn();

    if (isLoggedIn) {
      if (nextUrl === '/login') {
        this.router.navigate(['/admin']);
        return false;
      } else {
        return true;
      }
    } else {
      if (nextUrl === '/login') {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

}
