import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule} from '@kolkov/ngx-gallery';
//import { NgxGalleryModule } from 'ngx-gallery';
import { AlertifyService } from './services/alertify.service';
import { FileUploadModule } from 'ng2-file-upload';



import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvidor } from './services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitiesComponent } from './cities/cities.component';
import { appRoutes } from './routes';
import { CityDetailComponent } from './cities/city-detail/city-detail.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { UnsavedChanges} from './.guard/unsaved-changes.guard';
import { PhotoAddComponent } from './posts/photo-add/photo-add.component';
import { PhotoViewComponent } from './posts/photo-view/photo-view.component';
import { RepliesComponent } from './replies/replies.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { SearchedCityComponent } from './searchedCity/searchedCity.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';



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
      CityDetailComponent,
      PostsComponent,
      PostDetailComponent,
      ProfileEditComponent,
      PhotoAddComponent,
      PhotoViewComponent,
      RepliesComponent,
      AdminComponent,
      ContactComponent,
      SearchedCityComponent,
      UserDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
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
      //PostDetailResolver,
      UnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
