import {
  Component,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  User
} from 'src/app/.model/user';
import {
  ActivatedRoute
} from '@angular/router';
import {
  AlertifyService
} from 'src/app/services/alertify.service';
import {
  NgForm
} from '@angular/forms';
import {
  UserService
} from 'src/app/services/user.service';
import {
  AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm', { // de ce cu view child?
    static: true
  }) editForm: NgForm // e decorator pt a avea acces la form attributes
  user: User;
  image: File;
  model: User;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService,
              private authService: AuthService) {} // avem nevoie si de authService ca sa putem lua tokenul
  // video 100 min 5 ca sa nu iesim de pe browser????pastram???
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() { // de revazut????
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    console.log(this.user);
  }

  onSelectFile(file: File) { // called each time file input changes
    this.image = file;
  }

  updateProfile() {
    debugger;
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe((user: User) => {
      debugger;
      this.alertify.success('Profilul s-a updatat cu succes');
      this.editForm.reset(this.user);
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

    updatePhoto() {
      if (!this.image){
        this.alertify.error('Trebuie sa selectati o poza!');
        return;
      }
      this.userService.updatePhoto(this.authService.decodedToken.nameid, this.image).subscribe((user: User) => {
        this.alertify.success('Poza profilului s-a updatat cu succes');
        this.user.url = user.url;
      }, () => {
        this.alertify.error('Nu s-a reusit updatarea pozei');
      });


  

}
}

