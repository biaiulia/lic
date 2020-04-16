import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter();
    model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService)
   { } // injectam authservice ca sa putem folosi metoda facuta de acolo

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(() => {  // in subscribe se pune raspunsu, return e functie
      console.log('registration succesful');
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
