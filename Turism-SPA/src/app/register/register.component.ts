import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter();
    model: any = {};

    registerForm: FormGroup; // pt form control

  constructor(private authService: AuthService, private alertify: AlertifyService, private formBuilder: FormBuilder)
   { } // injectam authservice ca sa putem folosi metoda facuta de acolo

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatch});
  }

  passwordMatch(p: FormGroup){
    
    return p.get('password').value === p.get('confirmPassword').value ? null : {mismatch: true};
  }


  register(){
    



    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe(() => {  // in subscribe se pune raspunsu, return e functie
    //     console.log('registration succesful');
    //   }, error => {
    //     this.alertify.error(error);
    //   });
    // console.log(this.model);


  }
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
