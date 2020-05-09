import { Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CityService } from '../services/city.service';
import { AlertifyService} from '../services/alertify.service'
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators/catchError';
import { City } from '../.model/city';

@Injectable()

export class CityDetailResolver implements Resolve<City>{
    constructor(private cityService: CityService, private router: Router, private alertify: AlertifyService){}


    resolve(route: ActivatedRouteSnapshot): Observable<City>{
        
        return this.cityService.getCity(route.params['name']) // subscrie automat NU IA ID CI CITY ID
         .pipe(
             catchError(error => {
                this.alertify.error('Nu se pot lua datele orasului');
                this.router.navigate(['/home']); 
                return of(null); // returneaza observable de null
            })
         );
 };
}
