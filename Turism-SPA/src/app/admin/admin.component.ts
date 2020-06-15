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
    name: '',
    description: '',
    imageSend: undefined
  };
  cities: City[];

  constructor(private alertify: AlertifyService, private postService: PostService, private cityService: CityService) {}
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editCity.dirty) {
      $event.returnValue = true;
    }
  }
  ngOnInit() {
    this.getCities();
  }
  onSelectFile(file: File) { // called each time file input changes
    this.city.imageSend = file;
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

  addCity(){
    this.cityService.addCity(this.city).subscribe(next=>
      {
        this.alertify.success('Ati adaugat orasul');
        debugger;
        this.cities.push({...this.city}); // adauga o copie, nu referinta la this model
        this.city.name = '';
        this.city.description = '';
      },error=>{
        this.alertify.error('nu merge');
      });
    }
  

  getCities() {
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  deleteCity(cityId: number, citiesIndex: number) {
    debugger;
    this.cityService.deleteCity(cityId).subscribe(next => {
        this.alertify.success('orasul a fost sters');
        this.cities.splice(citiesIndex, 1);
    }, error=>{
      this.alertify.error('Nu s-a reusit stergerea');
    });

    }
  }


// getPosts(): void
// {
//   this.postService.getPosts
// }
