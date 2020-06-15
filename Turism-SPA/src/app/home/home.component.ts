import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import { CityService } from '../services/city.service';
import { City } from '../.model/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchedCities: City[];
  registerMode = false;

  search: string;
  constructor(private authService: AuthService, private cityService: CityService, private router: Router) {}

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

  // searchCities(search: string){
  //   debugger;
  //   this.cityService.searchCities(search).subscribe((cities) => {
  //     this.searchedCities = cities;
  //     this.router.navigate([`search/${search}`, {state: {searchedCities: this.searchedCities}}]);
  //   });
  // }
}
