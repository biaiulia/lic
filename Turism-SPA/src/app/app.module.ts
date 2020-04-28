import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule} from '@kolkov/ngx-gallery';
import { AlertifyService } from './services/alertify.service';

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
import { SanitizeUrlPipe } from './pipes/sanitizeUrl/sanitizeUrl.pipe';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { PostsComponent } from './posts/posts.component';



export function tokenGetter(){
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      CitiesComponent,
      MessagesComponent,
      SanitizeUrlPipe,
      CityDetailComponent,
      PostsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({config:{
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
      }
})]
   ,
   providers: [
      AuthService,
      ErrorInterceptorProvidor,
      AlertifyService,
     // PostDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
