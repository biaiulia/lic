import {
  Component,
  OnInit
} from '@angular/core';
import {
  City
} from '../.model/city';
import {
  CityService
} from '../services/city.service';
import {
  AlertifyService
} from '../services/alertify.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

  cities: City[];
  // posts: Post[];

  constructor(private cityService: CityService, private alertify: AlertifyService) {}

  ngOnInit() {
  this.loadCities();
  }
  loadCities() {
    debugger;
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    }, error => {
      this.alertify.error(error);
    });
  }

}
