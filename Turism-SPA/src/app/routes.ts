import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent } from './city-detail/city-detail.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent  },
    { path: 'messages', component: MessagesComponent},
    { path: 'cities', component: CitiesComponent },
    { path: 'cities/:id', component: CityDetailComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
