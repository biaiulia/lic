import { Component, OnInit, Input } from '@angular/core';
import { City } from '../.model/city';
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchedCity',
  templateUrl: './searchedCity.component.html',
  styleUrls: ['./searchedCity.component.css']
})

export class SearchedCityComponent implements OnInit {
  searchedCities: City[];
  foundCity: boolean;
  constructor(private cityService: CityService, private route: ActivatedRoute) { }

  ngOnInit(){
    debugger;
    this.searchCities();
  }

  searchCities(){

    this.cityService.searchCities(this.route.snapshot.params['name']).subscribe((cities) => {
      debugger;
      this.searchedCities = cities;
      if(this.searchedCities.length===0){
        this.foundCity = false;

        return false;}
      return true;
      });
}
}

