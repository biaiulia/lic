import {
  Component,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  AlertifyService
} from '../services/alertify.service';
import {
  PostService
} from '../services/post.service';
import {
  CityService
} from '../services/city.service';
import {
  City
} from '../.model/city';
import {
  NgForm
} from '@angular/forms';
import {
  AuthService
} from '../services/auth.service';
import {
  User
} from '../.model/user';
import {
  UserService
} from '../services/user.service';
import {
  Post
} from '../.model/post';
import {
  AdminService
} from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('editCity', { // de ce cu view child?
    static: true
  }) editCity: NgForm
  baseUrl: string;
  city: City = {
    name: null,
    description: null,
  };
  cities: City[];
  posts: Post[];
  users: User[];
  image: File;
  cityId: number;
  model: City = {
    name: '',
    description: '',
  };
  editMode: boolean;
  addMode: boolean;
  cityModeIndex: number;
  citiesIndex: number;
  buttonState = 'toate';

  constructor(private alertify: AlertifyService, private postService: PostService,
    private cityService: CityService, private authService: AuthService,
    private usersService: UserService,
    private adminService: AdminService) {}
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editCity.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.getCities();
    this.getUsers();
    this.editMode = false;
    this.addMode = false;
    this.cityModeIndex = 0;
  }
  onSelectFile(file: File) { // called each time file input changes
    debugger;
    this.image = file;
  }
  isAdmin() {
    if (this.authService.isAdmin('Admin')) {
      return true;
      return false;
    }
  }

  selectCity(cityId: number, citiesIndex: number) {
    this.editMode = true;
    this.cityId = cityId;
    this.citiesIndex = citiesIndex;
    this.adminService.getUnapprovedPosts(cityId).subscribe((posts: Post[]) => {
      debugger;
      this.posts = posts;
    })
  }
  cancelEdit() {
    this.editMode = false;

  }

  // addCityMode(){
  //   this.cityModeIndex++;
  //   debugger;
  //   if (this.cityModeIndex % 2 === 0){
  //   this.addMode = false;
  // }
  //   else{
  //     this.addMode = true;
  //   }
  // }
  updateCity(citiesIndex: number) {
    debugger;
    this.cityService.updateCity(this.cityId, this.city).subscribe((city: City) => {
      this.alertify.success('Orasul s-a updatat cu succes');
      this.cities[citiesIndex] = city;
      debugger;
    }, error => {
      this.alertify.error(error);
    });
  }

  updatePhoto() {
    debugger;
    if (!this.image) {
      this.alertify.error('Trebuie sa selectati o poza!');
      return;
    }
    this.cityService.updatePhoto(this.cityId, this.image).subscribe(next => {
      this.alertify.success('Poza orasului s-a updatat cu succes');
    }, error => {
      this.alertify.error('Nu s-a reusit updatarea pozei');
    });
  }

  // addCity(): void {
  //   debugger;
  //   this.cityService.addCity(this.city).subscribe((next) => {
  //     this.alertify.success('Ati adaugat orsaul');
  //     this.cities.push({
  //       ...this.city
  //     });
  //     this.editCity.reset(this.city);
  //     debugger;

  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  addCity() {
    this.cityService.addCity(this.city).subscribe(next => {
      this.alertify.success('Ati adaugat orasul');
      debugger;
      this.cities.push({
        ...this.city
      }); // adauga o copie, nu referinta la this model
      this.city.name = null;
      this.city.description = null;
      this.addMode = false;
    }, error => {
      this.alertify.error('nu merge');
    });
  }


  getCities() {
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }
  getUsers() {
    this.usersService.getUsers().subscribe((users: User[]) => {
      debugger;
      this.users = users;
    });
  }

  deleteCity(cityId: number, citiesIndex: number) {
    debugger;
    this.cityService.deleteCity(cityId).subscribe(next => {
      this.alertify.success('orasul a fost sters');
      this.cities.splice(citiesIndex, 1);
    }, error => {
      this.alertify.error('Nu s-a reusit stergerea');
    });

  }
  deleteUser(userName: string, userIndex: number) {
    debugger;
    this.usersService.deleteUser(userName).subscribe(() => {
      debugger;
      this.alertify.success('Ati sters utilizatorul');
      this.cities.splice(userIndex, 1);
    }, error => {
      this.alertify.error('Nu s-a reusit stergerea');
    });
  }

  deletePost(postId: number, postIndex: number) {
    debugger;
    this.adminService.adminRemovePost(postId).subscribe(next => {
      this.alertify.success('orasul a fost sters');
      this.cities.splice(postIndex, 1);
    }, error => {
      this.alertify.error('Nu s-a reusit stergerea');
    });

  }
  approvePost(postId: number, postIndex: number){
    this.adminService.approvePost(postId).subscribe( next=> {
      this.alertify.success('Postarea a fost aprobata');
      this.posts.splice(postIndex,1);
    }, error=>{
      this.alertify.error('Nu s-a reusit aprobarea');
    })
  }



  pressButton(filter: string) {
    this.buttonState = filter;
  }
}
