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
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  city: City;

  constructor(private cityService: CityService, private alertify: AlertifyService, private route: ActivatedRoute) //importam activated
  // route ca sa avem  acces la oras, gen din /cities/3 de ex
  {}

  ngOnInit() {
    this.loadCity();
  }
  loadCity() {  
    this.cityService.getCity(+this.route.snapshot.params['id']).subscribe((city: City) =>{ // ce plm face asta??????
      this.city = city;
    }, error => {
      this.alertify.error(error);
    });
  }
  // punem + in fata ca sa returnam in loc de string id number id
}



