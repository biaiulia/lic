import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // ???????????

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { } 
  // AuthService in constructor prin injectie

  ngOnInit() {
  }

  login() {
   this.authService.login(this.model).subscribe(next => {
     this.alertify.success('logged in succesfully');
   }, error => {
     this.alertify.error(error);
  //  },() => { // trebe stearsa dupa
  //    this.router.navigate(['/home']);
   }
  );
  }
   loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  register() {
    this.authService.registerMode.next(true);
  }

  isAdmin(role: string): boolean{
    debugger;
    if(this.authService.decodedToken.role === role){
      return true;
    }
    return false;

    }

}
