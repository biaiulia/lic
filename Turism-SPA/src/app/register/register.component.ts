import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import {
  AlertifyService
} from '../services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  User
} from '../.model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: User;
  model: any = {};

  registerForm: FormGroup; // pt form control

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private formBuilder: FormBuilder, private router: Router) {} // injectam authservice ca sa putem folosi metoda facuta de acolo

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatch
    });
  }

  passwordMatch(p: FormGroup) {

    return p.get('password').value === p.get('confirmPassword').value ? null : {
      mismatch: true
    };
  }


  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value); // asignam userului ce e in form
      this.authService.register(this.user).subscribe(() => {
          this.router.navigate(['/home']);
          this.alertify.success('v-ati înregistrat');
          
        },
        error => {
          this.alertify.error(error);
        });
    }
  }

  // this.authService.register(this.model).subscribe(() => {
  //   console.log('registration succesful');
  // }, error => {
  //   console.log(error)
  // });
  // console.log(this.model);


  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
// register(){   ce era in ala vechi de mergea
//   this.authService.register(this.model).subscribe(() => {  // in subscribe se pune raspunsu, return e functie
//     console.log('registration succesful');
//   }, error => {
//     this.alertify.error(error);
//   });
//   console.log(this.model);
