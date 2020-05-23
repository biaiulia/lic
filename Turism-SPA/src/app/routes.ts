import {
  Routes
} from '@angular/router';
import {
  HomeComponent
} from './home/home.component';
import {
  MessagesComponent
} from './messages/messages.component';
import {
  CitiesComponent
} from './cities/cities.component';
import {
  CityDetailComponent
} from './cities/city-detail/city-detail.component';
import {
  PostDetailComponent
} from './posts/post-detail/post-detail.component';
import {
  PostDetailResolver
} from './.resolver/post-detail.resolver';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {ProfileEditResolver} from './.resolver/profile-edit.resolver';
import {UnsavedChanges} from './.guard/unsaved-changes.guard';
import {PhotoAddComponent} from './posts/photo-add/photo-add.component';

export const appRoutes: Routes = [{
  path: 'home',
  component: HomeComponent
},
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: 'user/edit',
    component: ProfileEditComponent, resolve: {user: ProfileEditResolver}, canDeactivate: [UnsavedChanges]
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
    component: PostDetailComponent // , resolve: {post: PostDetailResolver} ???? nu merge
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
