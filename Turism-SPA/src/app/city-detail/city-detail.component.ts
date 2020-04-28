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
import {Post} from '../.model/post';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  city: City;
  posts: Post[];

  constructor(private cityService: CityService,
              private alertify: AlertifyService, private route: ActivatedRoute, // qctivqted route stie linku pe care esti
              private postsService: PostService) //importam activated
  // route ca sa avem  acces la oras, gen din /cities/3 de ex
  {
  }

  ngOnInit() {
    this.loadCity();
  }

  loadCity() {
    this.cityService.getCity(+this.route.snapshot.params['id']).subscribe((city: City) => { // ce plm face asta??????
      this.city = city;
      this.postsService.getPosts(city.id).subscribe((posts: Post[]) => {
        debugger;
        this.posts = posts instanceof Array ? posts : [posts];
      }, (error) => {
        this.alertify.error(error);
      });
    });


    // punem + in fata ca sa returnam in loc de string id number id
  }
}



