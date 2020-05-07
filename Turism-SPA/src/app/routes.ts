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
    path: ':name',
    component: CityDetailComponent,
    children: [{
      path: ':id',
      component: PostDetailComponent// , resolve: {post: PostDetailResolver}
    }]
  }, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
