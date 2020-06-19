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
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { City } from '../.model/city';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // @Input() post: Post;
  @Input() posts: Post[]; // sa fac un request sau sa pun conditie sa aiba approved=1
  @Input() city: City;
  users: User[];
  cityName: string;
  buttonState = 'toate';
  constructor(private postService: PostService, private alertify: AlertifyService, 
    private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
    private adminService: AdminService) {

  }
  approvedPosts(){
    debugger;
    this.posts = this.city.posts.filter(p => p.approved === 1);
  }

  ngOnInit() {
    this.cityName = this.route.snapshot.params['name'];
    this.getUsers();
    this.approvedPosts();
    console.log(this.posts);
  }

  pressButton(filter: string){
    this.buttonState = filter;
  }
  getUsers(){
    this.userService.getUsersByPoints().subscribe((users: User[])=>{
      this.users = users;
    });
  }

  yourPost(userId: number) {
    if (userId === +this.authService.decodedToken.nameid) {
      return true;
    }
    return false;
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  isAdmin(){
    return this.authService.isAdmin('Admin');
  }

  removePost(id: number, postIndex: number){
    debugger;
    if(this.isAdmin())
    {
      this.adminDeletePost(id, postIndex);
      
    }else {
      this.deletePost(id, postIndex);
    }
    this.posts.splice(postIndex, 1);
  }

  deletePost(id: number, postIndex: number) {
    this.postService.deletePost(id).subscribe(next => {
      this.alertify.success('Ati sters postarea');
    }, error => {
      this.alertify.error('nu se poate sterge');
    });
  }
  adminDeletePost(id: number, postIndex: number){
    debugger;
    this.adminService.adminRemovePost(id).subscribe(next => {
      this.alertify.success('ati sters postarea');
    }, error => {
      this.alertify.error('nu se poate sterge');
    });
  }



}