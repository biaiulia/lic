import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvidor } from './services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({ 
   declarations: [ // compoonente din proiect
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [ // aici pui modulele de care ai nevoie
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule
   ],
   providers: [ // aici vin serviciile
      AuthService,
      ErrorInterceptorProvidor
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
