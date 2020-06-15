import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/.model/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    console.log(this.user);
  }
  // getUser()
  // {
  //   this.userService.getUserByName(this.route.snapshot.params['name']).subscribe((user: User)=>{
  //     this.user=user;
  //   });
  // }
  

}
