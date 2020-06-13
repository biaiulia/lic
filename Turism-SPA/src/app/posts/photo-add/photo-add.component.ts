import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Photo
} from 'src/app/.model/photo';
import {
  FileUploader
} from 'ng2-file-upload';
import {
  environment
} from 'src/environments/environment';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  City
} from '../../.model/city';
import {
  CityService
} from '../../services/city.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  PostService
} from 'src/app/services/post.service';
import {
  AlertifyService
} from 'src/app/services/alertify.service';
import {
  Location
} from '@angular/common';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader; //= new FileUploader({url:URL});
  hasBaseDropZoneOver = false;
  baseUrl = environment;
  postAddGroup: FormGroup;
  images: FileList;
  city: City;
  model: any = {};
  url: string;
  imagePostIndex = 0;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private cityService: CityService,
              private route: ActivatedRoute,
              private postService: PostService,
              private alertify: AlertifyService,
              private location: Location) {}

  ngOnInit() { // de ce pot pune doar aici debugger
    this.getCity();
    // this.initializeUploader(4);
    // this.postAddGroup = this.formBuilder.group({
    //   postText: ['']
    //  // image: []
    // });
  }

  onSelectFile(files: FileList) { // called each time file input changes
    this.images = files;
  }

  /* fileOverBase(e: any): void {
     this.hasBaseDropZoneOver = e;
   }

   initializeUploader(postId: number) {
     this.uploader = new FileUploader({
       url: this.baseUrl + 'posts/' + postId + '/photos',
       //+ this.photos.postId + '/photos',
       //'users/' + this.authService.decodedToken.nameid + '/photos', TREBE ADAUGAT AICI URL U PT BACKEND
       authToken: 'Bearer' + localStorage.getItem('token'),
       isHTML5: true,
       allowedFileType: ['image'],
       removeAfterUpload: true,
       autoUpload: false,
       maxFileSize: 10 * 1024 * 1024 // ca sa fie de 10 mb fisieru

     });
     debugger;
     this.uploader.onAfterAddingFile = (file) => {
       file.withCredentials = false;
     };
   }*/


  addPost(): void { // nu vrea sa insereze textu, dc?
    this.postService.addPost(this.model, this.city.id, this.authService.decodedToken.nameid).subscribe(next => {
        this.alertify.success('postarea a fost adaugata');
        this.location.back();
        debugger;
        if (!this.images) {
          return;
        }
        this.addPhoto(next);

      },
      error => {
        this.alertify.error('nu s-a reusit');
      });
  }

  addPhoto(next: any): void {
    this.postService.addPhoto(next.id, this.images).subscribe((res) => {
      if (this.imagePostIndex < this.images.length) {
        this.imagePostIndex++;
        this.addPhoto(next);
        return;
      }

      this.location.back();

    }, error => {
      this.alertify.error('nu mere');
    });
  }

  private getCity(): void {
    this.cityService.getCities().subscribe((cities: City[]) => {
      const cityName = this.route.snapshot.params['name'];
      cities.some((city: City) => {
        if (city.name.toLowerCase() === cityName) {
          this.city = city;
          return;
        }
      });
      // this.cities = cities;
    }, error => {
      // this.alertify.error(error);
    });
  }
}
