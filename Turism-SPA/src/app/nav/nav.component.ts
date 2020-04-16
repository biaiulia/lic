import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // ???????????

  constructor(public authService: AuthService, private alertify: AlertifyService) { } // AuthService in constructor prin injectie

  ngOnInit() {
  }

  login() {
   this.authService.login(this.model).subscribe(next => {
     this.alertify.success('logged in succesfully')

   }, error => {
     this.alertify.error(error);
   });
  } // ceeee?

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
