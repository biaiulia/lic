import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Post
} from '../.model/post';
import {
  PostService
} from '../services/post.service';
import {
  AlertifyService
} from '../services/alertify.service';
import {
  ActivatedRoute
} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../.model/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // @Input() post: Post;
  @Input() posts: Post[];
  users: User[];
  cityName: string;
  buttonState = 'toate';
  constructor(private postService: PostService, private alertify: AlertifyService, private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    this.cityName = this.route.snapshot.params['name'];
    this.getUsers();
  }

  pressButton(filter: string){
    this.buttonState = filter;

  }
  getUsers(){
    this.userService.getUsersByPoints().subscribe((users: User[])=>{
      this.users = users;
    });
  }

  // getPostByType(postType: string) {
  //   this.postByType= [];
  //   for (let post in this.posts) {
  //     if (post.type === postType) {
  //       this.postByType.push(post);
  //     }
  //   }
  // }



}
//postXp(){
// this.postService.addPost(this.post, )`

// }
