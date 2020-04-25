import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

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
import { PostListComponent } from './postList/postList.component';
import { SanitizeUrlPipe } from './pipes/sanitizeUrl/sanitizeUrl.pipe';
import { CityDetailComponent } from './city-detail/city-detail.component';



export function tokenGetter(){
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      //componenteleproiectului\\\\n\n
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      CitiesComponent,
      MessagesComponent,
      PostListComponent,
      SanitizeUrlPipe,
      CityDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({config:{
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
      }
})]
   ,
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
