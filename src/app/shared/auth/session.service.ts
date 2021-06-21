import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SessionService {
  private user: any;
  private token: string;
  private jwtHelper: JwtHelperService;

  constructor() {
    this.user = null;
    this.token = null;
    this.jwtHelper = new JwtHelperService();
    this.loadToken();
  }

  loginUser({access_token, user}) {
    try {
      this.jwtHelper.decodeToken(access_token);
      this.token = access_token;
      this.user = user;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log(" USER ",this.user);
    } catch (err) {
      // TODO:log to server this error
      console.log({err});
    }
  }
  logout() {
    try {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    } catch (err) {
      // TODO:log to server this error
      console.log({err});
    }
  }

  getAuthToken() {
    return this.token;
  }
  // getMerchant() {
  //   if (!this.user) {
  //     return null;
  //   }
  //   return this.user.merchant;
  // }
  loadToken() {
    this.token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  getUser() {
    return this.user;
  }

  // getUserId() {
  //   return this.user && this.user.koparId ? this.user.koparId : null;
  // }

  isAuthenticated() {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }

  // hasRoles(roles =  []) {
  //   if (!roles || roles.length === 0) {
  //     return true;
  //   }

  //   return this.isAuthenticated() &&
  //          this.user &&
  //          roles.includes(this.user.role)
  // }
}
