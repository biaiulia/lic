import {
  Routes
} from '@angular/router';
import {
  HomeComponent
} from './home/home.component';
import {
  CitiesComponent
} from './cities/cities.component';
import {
  CityDetailComponent
} from './cities/city-detail/city-detail.component';
import {
  PostDetailComponent
} from './posts/post-detail/post-detail.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {UnsavedChanges} from './.guard/unsaved-changes.guard';
import {PhotoAddComponent} from './posts/photo-add/photo-add.component';
import { AdminComponent } from './admin/admin.component';
import { SearchedCityComponent } from './searchedCity/searchedCity.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

export const appRoutes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'admin',
  component: AdminComponent, data: {roles:['Admin']} // ceee??

},
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: 'user/edit/:name',
    component: ProfileEditComponent, canDeactivate: [UnsavedChanges]
  },
  {
    path: 'user/:name',
    component: UserDetailComponent
  },
  {
    path: 'search/:name',
    component: SearchedCityComponent
  },
  {
    path: ':name',
    component: CityDetailComponent
  },{
        path: ':name/addPost', // dc nu merge???
        component: PhotoAddComponent
    
  },
  {
    path: ':name/:id',
    component: PostDetailComponent
  },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
