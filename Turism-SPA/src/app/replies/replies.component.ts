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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  @Input() replies: Reply[];
  model: any = {};

  constructor(private replyService: ReplyService, private alertify: AlertifyService,
              private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {}
  
  AddReply(){
    this.replyService.addReply(this.route.snapshot.params['id'], this.authService.decodedToken.nameid, this.model).subscribe(next=>
      {
        this.alertify.success('Ati adaugat reply-ul');
        this.model.userId = +this.authService.decodedToken.nameid;
        debugger;
        this.replies.push({...this.model}); // adauga o copie, nu referinta la this model
        this.model.comment = '';
      },error=>{
        this.alertify.error('nu merge');
      });

  }
  yourPost(userId: number){
    if (userId === +this.authService.decodedToken.nameid){

      return true;
    }
    return false;
  }
  

  loggedIn(){
    return this.authService.loggedIn();
  }

  deleteReply(id: number, replyIndex: number){
    debugger;
   this.replyService.deleteReply(this.authService.decodedToken.nameid, id).subscribe( next => {
     this.alertify.success('ati sters comentariul');
     this.replies.splice(replyIndex, 1);
   },error=>{
     this.alertify.error('nu se poate sterge');
   });
  }

  // loadReplies() {
  //   this.replyService.getReplies(+this.route.snapshot.params['id'].subscribe((replies: Reply[]) => {
  //     this.replies = replies instanceof Array ? replies : [replies]; // ceeeeeee?
  //   }, (error) => {
  //     this.alertify.error(error);
  //   }));
  // }


}
