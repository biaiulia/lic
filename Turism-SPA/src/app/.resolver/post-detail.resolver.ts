import { Injectable} from '@angular/core';
import {Post} from '../.model/post';
import {Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from '../services/post.service';
import { AlertifyService} from '../services/alertify.service'
import { Observable, of } from 'rxjs';

@Injectable()

export class PostDetailResolver implements Resolve<Post>{
    constructor(private postService: PostService, private router: Router, private alertify: AlertifyService){}


    resolve(route: ActivatedRouteSnapshot): Observable<Post>{
        return this.postService.getPost(route.params['id']);
    //     .pipe(
    //         catchError(error => {
    //             this.alertify.error('Nu se pot lua datele');
    //             this.router.navigate(['/cities']);
    //             return of(null);
    //         })
    //     );
    // };
}
}