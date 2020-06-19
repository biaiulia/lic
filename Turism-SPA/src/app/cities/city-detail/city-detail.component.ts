import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  City
} from '../../.model/city';
import {
  CityService
} from '../../services/city.service';
import {
  AlertifyService
} from '../../services/alertify.service';
import {
  ActivatedRoute
} from '@angular/router';
import {Post} from '../../.model/post';
import {PostService} from '../../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  
  @Input() posts: Post[];
  city: City;
  detailMode: false;
  clickEventSubscription: Subscription;

  constructor(private cityService: CityService,
              private alertify: AlertifyService, private route: ActivatedRoute, // qctivqted route stie linku pe care esti
              private postsService: PostService, private authService: AuthService) // importam activated
  // route ca sa avem  acces la oras, gen din /cities/3 de ex
  {
  }

  ngOnInit() {
    // this.route.data.subscribe(data=>{
    //   this.city = data['city']
    // })
    this.loadCity();
    // this.detailMode = this.detailMode;
  }
  // detailToggle(post: Post){
  //   this.detailMode = false;

  // }


  loggedIn(){
    return this.authService.loggedIn();
  }

  loadCity() {
    const cityName = this.route.snapshot.params['name'];
    this.cityService.getCity(cityName).subscribe((city: City) => { // ce plm face asta??????
      debugger;
      this.city = city;
      this.posts = this.city.posts;
      // this.postsService.getPosts(this.city.id).subscribe((posts: Post[]) => {
      //   this.posts = posts instanceof Array ? posts : [posts]; // ceeeee?
      // }, (error) => {
      //   this.alertify.error(error);
      // });
    });

  }

  }




