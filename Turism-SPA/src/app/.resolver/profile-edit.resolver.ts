import { Injectable} from '@angular/core';
import {User} from '../.model/user';
import {Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService} from '../services/alertify.service';
import { UserService} from '../services/user.service';
import { AuthService} from '../services/auth.service'
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators/catchError';

@Injectable()

export class ProfileEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private router: Router, private authService: AuthService,
                private alertify: AlertifyService){}


    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid) // subscrie automat NU IA ID CI CITY ID
         .pipe(
             catchError(error => {
                this.alertify.error('Nu se pot lua datele');
                this.router.navigate([route.params['/profile']]);
                return of(null); // returneaza observable de null
            })
         );
 };
}
