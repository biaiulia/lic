import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Post
} from '../../.model/post';
import {
  NgxGalleryOptions,
  NgxGalleryImage
} from '@kolkov/ngx-gallery';
import {
  PostService
} from '../../services/post.service';
import {
  AlertifyService
} from '../../services/alertify.service';
import {
  ActivatedRoute
} from '@angular/router';
import { PhotoAddComponent } from '../photo-add/photo-add.component';
import { Photo } from 'src/app/.model/photo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @ViewChild(PhotoAddComponent) photo: Photo[]; // ?????


  post: Post;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private postService: PostService, private alertify: AlertifyService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
  
      this.loadPost();
 // this.route.data.subscribe(data=>{
      //   this.post = data['post'];

      // });
  }

  loadPost() {
    
    this.postService.getPost(+this.route.snapshot.params['id']).subscribe((post: Post) => {
      debugger;
        this.post = post;
      this.postService.getPostLikes(+this.route.snapshot.params['id']);
    }, error =>
      this.alertify.error(error)
  );
  }

  likePost(postId: number){
    this.postService.sendLike(this.authService.decodedToken.nameid, postId).subscribe(data => {
      this.alertify.success('Ai dat like la postarea asta.');
    }, error => {
      this.alertify.error(error);
    });
  }

}


