import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/.model/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm',{static:true}) editForm: NgForm // e decorator pt a avea acces la form attributes
  user: User;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, 
    private authService: AuthService) { } // avem nevoie si de authService ca sa putem lua tokenul
  //video 100 min 5 ca sa nu iesim de pe browser????pastram???
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }

  ngOnInit() { // de revazut????
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  updateProfile(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next =>{
      this.alertify.success('Profilul s-a updatat cu succes');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });


  }

}
