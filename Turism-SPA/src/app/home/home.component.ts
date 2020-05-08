import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AuthService
} from '../services/auth.service';
import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.registerMode.subscribe((registerMode) => {
      this.registerMode = registerMode;
    });
  }
  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = false; // registermode
  }
  getUrl() {
    return 'D:\lic\turism\Turism-SPA\src\assets\img\backgr.jpg';
  }
}
