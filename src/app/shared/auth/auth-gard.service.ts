import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.sessionService.isAuthenticated()) {
      this.sessionService.logout();
      this.router.navigate(['/pages/login'], {queryParams: {returnUrl: state.url}})
      return false;
    }
    // if (!this.sessionService.hasRoles(route.data.roles)) {
    //   this.router.navigate(['/pages/login'], {queryParams: {message: 'No Auth.'}})
    //   console.log('No Auth');
    //   return false;
    // }
    return true;
  }
}
