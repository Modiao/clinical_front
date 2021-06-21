import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SessionService } from 'src/app/shared/auth/session.service';
import { Utils } from 'src/app/shared/Utils/Utils.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  disabled = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  setConnexionStatus(e){
    if(e.key !== 'Enter'){
      this.disabled = false;
    }
  }
  // On submit button click
  onSubmit() {
    this.disabled = true;
    this.authService.signinUser(this.username, this.password)
      .subscribe((data) => {
        // let role = this.sessionService.getUser().role;
        // switch (role) {
        //   case 'admin':
        //   case 'merchant_admin':
        //     this.router.navigate(['/ma-caisse']);
        //     break;
        //   case 'supervisor':
        //     this.router.navigate(['/transactions']);
        //     break;
        // }
        this.router.navigate(['/tickets']);
      }, (err) => {
        console.log(err.detail );
        Utils.notify('error', 'Erreur d\'authentification');
        this.disabled = false;
      });
  }
  // On Forgot password link click
  // onForgotPassword() {
  //   this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  // }
}
