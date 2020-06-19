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
  NgForm,
  FormBuilder,
  Validators,
  FormGroup
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
  pchange: any;
  passwordChangeForm: FormGroup;
  birthDateExists: boolean;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {} // avem nevoie si de authService ca sa putem lua tokenul
  // video 100 min 5 ca sa nu iesim de pe browser????pastram???
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() { // de revazut????
    this.getUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    console.log(this.user);
    this.createChangePasswordForm();
    if(this.user.age>110){
      this.birthDateExists = false;
    }
  }

  createChangePasswordForm() {
    debugger;
    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.required, Validators.minLength(6)],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatch
    });
  }
  passwordMatch(p: FormGroup) {


    return p.get('newPassword').value === p.get('confirmPassword').value ? null : {
      mismatch: true
    };
  }
  changePassword() {
    debugger;
    this.pchange = Object.assign({}, this.passwordChangeForm.value); // asignam userului ce e in form
    this.pchange.userName = this.user.username;
    this.authService.changePassword(this.pchange).subscribe(() => {
        this.alertify.success('ati schimbat parola');

      },
      error => {
        this.alertify.error('Nu s-a reusit schimbarea parolei');
      });

    

  }


  onSelectFile(file: File) { // called each time file input changes
    this.image = file;
  }

  updateProfile() {
    debugger;
    this.userService.updateUser(this.authService.decodedToken.nameid, this.model).subscribe((user: User) => {
      debugger;
      this.alertify.success('Profilul s-a updatat cu succes');
      this.editForm.reset(this.user);
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  updatePhoto() {
    if (!this.image) {
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

  getUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;
      this.model = user;
    });
  }
}
