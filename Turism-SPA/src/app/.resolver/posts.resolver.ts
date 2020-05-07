import { Injectable} from '@angular/core';
import {Post} from '../.model/post';
import {Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from '../services/post.service';
import { AlertifyService} from '../services/alertify.service'
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators/catchError';

@Injectable()

export class PostsResolver implements Resolve<Post>{
    constructor(private postService: PostService, private router: Router, private alertify: AlertifyService){}


    resolve(route: ActivatedRouteSnapshot): Observable<Post>{
        debugger;
        return this.postService.getPosts(route.params['id']) // subscrie automat NU IA ID CI CITY ID
         .pipe(
             catchError(error => {
                this.alertify.error('Nu se pot lua datele');
                this.router.navigate(['/cities']); 
                return of(null); // returneaza observable de null
            })
         );
 };
}
