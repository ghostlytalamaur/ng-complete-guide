import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthrenticated().then((isAuthenticated) => this.isAuthenticated = isAuthenticated);
  }

  onLogin() {
    this.authService.login();
    this.isAuthenticated = true;
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
