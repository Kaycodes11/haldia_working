import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SvLoginService } from '../login/sv-login.service';
@Injectable({
  providedIn: 'root',
})
export class SvAuthGuardService {
  constructor(
    private router: Router,
    private authService: SvLoginService,
    private location: Location
  ) {
    /*
     router.events.subscribe(val => {
       if (location.path() === '/login' && ) {
          console.log('RouterURL: ', typeof this.router.url);
           console.log(this.location.getState());
           console.log(this.location.isCurrentPathEqualTo('/payment'));
          if (
            this.location.isCurrentPathEqualTo(this.router.url) &&
            !sessionStorage.getItem('username')
          ) {
            router.navigate(['login']);
          }
       }
     }); */
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) return true;

    // else
    this.router.navigate(['login']);
    return false;
  }
}
