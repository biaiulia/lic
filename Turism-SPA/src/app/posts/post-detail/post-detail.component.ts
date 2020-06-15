import {
  Component,
  OnInit,
  Input
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

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  // @ViewChild(PhotoAddComponent) photo: Photo[]; // ?????
  @Input() photos: Photo[];
  likesNr: number;
  post: Post;

  constructor(private postService: PostService, private alertify: AlertifyService, private route: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    debugger;

    this.loadPost();
    // this.route.data.subscribe(data=>{
    //   this.post = data['post'];

    // });
  }
  loggedIn(){
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
