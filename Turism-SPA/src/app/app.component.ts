import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Turism';
  jwtHelper = new JwtHelperService();


  constructor(private authService: AuthService){}


  ngOnInit(){
    const token= localStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
  onActivate(event) {
    window.scroll(0,0);
  }

}
