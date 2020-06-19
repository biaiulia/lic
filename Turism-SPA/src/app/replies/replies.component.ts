import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ReplyService
} from '../services/reply.service';
import {
  AlertifyService
} from '../services/alertify.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Reply
} from '../.model/reply';
import {
  Post
} from '../.model/post';
import {
  AuthService
} from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../.model/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  @Input() replies: Reply[];
  model: any = {};
  users: User[];

  constructor(private replyService: ReplyService, private alertify: AlertifyService,
              private route: ActivatedRoute, private authService: AuthService, private userService: UserService,
              private adminService: AdminService) {}

  ngOnInit() {}


  AddReply() {
    debugger;
    this.replyService.addReply(this.route.snapshot.params['id'], this.authService.decodedToken.nameid, this.model).subscribe(next => {
      debugger;
      this.alertify.success('Ati adaugat reply-ul');
      this.replies.push({
        ...this.model
      }); // adauga o copie, nu referinta la this model
      this.model.comment = '';
    }, error => {
      this.alertify.error('nu merge');
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

  removeReply(id: number, replyIndex: number){
    debugger;
    if(this.isAdmin())
    {
      this.adminDeleteReply(id, replyIndex);
      
    }else {
      this.deleteReply(id, replyIndex);
    }
  }

  deleteReply(id: number, replyIndex: number) {
    this.replyService.deleteReply(id).subscribe(next => {
      this.alertify.success('ati sters comentariul');
      this.replies.splice(replyIndex, 1);
    }, error => {
      this.alertify.error('nu se poate sterge');
    });
  }
  adminDeleteReply(id: number, replyIndex: number){
    debugger;
    this.adminService.adminRemoveReply(id).subscribe(next => {
      this.alertify.success('ati sters comentariul');
      this.replies.splice(replyIndex, 1);
    }, error => {
      this.alertify.error('nu se poate sterge');
    });
  }
  }

  // loadReplies() {
  //   this.replyService.getReplies(+this.route.snapshot.params['id'].subscribe((replies: Reply[]) => {
  //     this.replies = replies instanceof Array ? replies : [replies]; // ceeeeeee?
  //   }, (error) => {
  //     this.alertify.error(error);
  //   }));
  // }



