import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../auth/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {}
  logout() {
    this.sessionService.logout();
    this.router.navigate(['pages/login'])
  }
}
