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
  userExists: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.loadUser();
  }

   loadUser() : void {
    this.userService.getUserByName(this.route.snapshot.params['name']).subscribe((user: User) => {
      this.user = user;
      debugger;
      if(user){
          this.userExists = true;
      }
      else{
        this.userExists = false;
      }
      console.log(this.user);
    });
  }
   }

  
  
  //   getUser(){
  //     const userName = this.route.snapshot.params['name'].ToLower();
  //     this.userService.getUserByName(userName).subscribe(userr: User=> {

  //     }
  //   }
  // }

    
    

    
    // this.route.data.subscribe(data => {
    //   this.user = data['user'].ToLower();
    // });
    // console.log(this.user);
  
  // getUser()
  // {
  //   this.userService.getUserByName(this.route.snapshot.params['name']).subscribe((user: User)=>{
  //     this.user=user;
  //   });
  // }
  


