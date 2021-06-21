import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  token: string;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  // signupUser(email: string, password: string) {
  //   //your code for signing up the new user
  // }

  signinUser(username: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/login/`, {
        email: username,
        password
      })
      .pipe(
        map((o: any) => o),
        map(data => this.sessionService.loginUser({...data}))
      )
  }

  // resetPassword(resetPasswordToken: string, newPassword: string, confirmPassword: string) {
  //   return this.http.put(`${this.apiUrl}/admin/users/resetpassword`, {
  //     resetPasswordToken,
  //     newPassword,
  //     confirmPassword
  //   })
  //   .pipe(
  //     map((o: any) => o.message)
  //   )
  // }

  // forgotPassword(email) {
  //   return this.http.post(`${this.apiUrl}/admin/users/forgotpassword`, {
  //     email
  //   })
  //   .pipe(
  //     map((o: any) => o.message)
  //   )
  // }

  logout() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return true;
  }
}
