import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // ???????????

  constructor(private authService: AuthService) { } // AuthService in constructor prin injectie

  ngOnInit() {
  }

  login() {
   this.authService.login(this.model).subscribe(next => {
     console.log('Logged in succesfully');

   }, error => {
     console.log(error);
   });
  } // ceeee?

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token; // returneaza adevarat sau fals !!. daca e gol arata false daca are arata true
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
