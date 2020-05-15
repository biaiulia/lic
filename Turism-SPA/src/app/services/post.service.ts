import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable, Subject
} from 'rxjs';
import {
  Post
} from '../.model/post';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl;
  subject: Subject<any>;

  constructor(private http: HttpClient, authService: AuthService) {}

  getPosts(cityId): Observable < Post[] > {
    return this.http.get < Post[] > (`${this.baseUrl}cities/${cityId}/posts`);
  }
  getPost(id): Observable < Post > {
    debugger;
   // this.getPostLikes(id);
    return this.http.get < Post > (`${this.baseUrl}posts/${id}`);
  }
  
  getPostLikes(postId){
    return this.http.get(`${this.baseUrl}posts/likesnr/${postId}`);
  }
  

  addPost(model: any, cityId, userId){
    return this.http.post(`${this.baseUrl}${userId}${cityId}/posts`, model).pipe(
      map((response: any) => {
        const post = response;
        if(post){
          console.log(post);
        }
      })
       // de ce nu merge???
    //"api/{userId}/{cityId}/posts"

    );}

    sendLike(userId: number, postId: number){
      return this.http.post(this.baseUrl + userId + '/like/' + postId, {});
     }
    }


  
  
  // sendClickEvent(){
  //   this.subject.next();
  // }
//  

