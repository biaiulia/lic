import {
  Component,
  OnInit
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

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {


  post: Post;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private postService: PostService, private alertify: AlertifyService, private route: ActivatedRoute) {}

  ngOnInit() {
  
      this.loadPost();
 // this.route.data.subscribe(data=>{
      //   this.post = data['post'];

      // });
  }

  loadPost() {
    
    this.postService.getPost(+this.route.snapshot.params['id']).subscribe((post: Post) => {
        this.post = post;
    }, error =>
      this.alertify.error(error)
  );
  }
}


