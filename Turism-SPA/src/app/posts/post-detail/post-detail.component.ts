import {
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';
import {
  Post
} from '../../.model/post';
import {

  PostService
} from '../../services/post.service';
import {
  AlertifyService
} from '../../services/alertify.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Photo
} from 'src/app/.model/photo';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from '@kolkov/ngx-gallery';
import {
  City
} from 'src/app/.model/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnChanges {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() photos: Photo[];
  @Input() city: City;
  photosExist = true;
  likesNr: number;
  post: Post;

  constructor(private postService: PostService, private alertify: AlertifyService, private route: ActivatedRoute,
    private authService: AuthService, private cityService: CityService) {}

  ngOnInit() {
    debugger;
    this.getCity();

    this.loadPost();
    if (this.photos != null) {
      debugger;
      this.galleryOptions = [{
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }];
    }
  }
  getCity(){
    this.cityService.getCity(this.route.snapshot.params['name']).subscribe((city: City)=>{
      this.city=city;
    })
  }


  ngOnChanges(): void {
    debugger;
    if (!this.photos) {
      this.photosExist = false;
      return;
    }
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imageUrls = [];
    this.photosExist = true;
    for (const photo of this.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  loadPost() {

    this.postService.getPost(+this.route.snapshot.params['id']).subscribe((post: Post) => {
      this.post = post;
      console.log(this.post);
      this.getLikes(post.id);
    });
  }

  likePost(postId: number) { // herme cum fac aici sa fac  intr-un singur subscribe si la final eroarea AJUTOR????
    this.postService.isLiked(this.authService.decodedToken.nameid, postId).subscribe((res: any) => {
      if (res) {
        this.postService.sendDislike(this.authService.decodedToken.nameid, postId).subscribe(() => {
          this.alertify.success('Ai dat dislike la postarea asta');
          this.getLikes(postId);
        }, error => {
          this.alertify.error(error);
        });
        return;
      }
      this.postService.sendLike(this.authService.decodedToken.nameid, postId).subscribe(() => {
        this.alertify.success('Ai dat like la postarea asta.');
        this.getLikes(postId);
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  private getLikes(postId: number): void {
    this.postService.getPostLikesNr(postId).subscribe((res: number) => {
      this.likesNr = res;
    }, error => {
      this.alertify.error(error);
    });
  }
}
