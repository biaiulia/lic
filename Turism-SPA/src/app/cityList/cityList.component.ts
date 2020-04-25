import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { AlertifyService } from '../services/alertify.service';
import { City } from '../.model/city';

@Component({
  selector: 'app-cityList',
  templateUrl: './cityList.component.html',
  styleUrls: ['./cityList.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[];

  constructor(private cityService: CityService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadCities();
  }
  loadCities(){
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    }, error => {
      this.alertify.error(error);
    });
  }

}
