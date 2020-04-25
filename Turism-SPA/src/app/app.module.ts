import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvidor } from './services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitiesComponent } from './cities/cities.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { CityListComponent } from './cityList/cityList.component';
import { PostListComponent } from './postList/postList.component';


@NgModule({
   declarations: [
      //componenteleproiectului\\n
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      CitiesComponent,
      MessagesComponent,
      CityListComponent,
      PostListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      //servicii\\n\\n
      AuthService,
      ErrorInterceptorProvidor
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
