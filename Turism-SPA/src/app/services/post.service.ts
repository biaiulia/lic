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
  Observable,
  Subject
} from 'rxjs';
import {
  Post
} from '../.model/post';
import {
  AuthService
} from './auth.service';
import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl;
  subject: Subject < any > ;

  constructor(private http: HttpClient, authService: AuthService) {}

  getPosts(cityId): Observable < Post[] > {
    debugger;
    return this.http.get < Post[] > (`${this.baseUrl}cities/${cityId}/posts`);
  }
  getPost(id): Observable < Post > {
    // this.getPostLikes(id);
    return this.http.get < Post > (`${this.baseUrl}posts/${id}`);
  }

  getPostLikesNr(postId) { // cum fac sa returnez nr de like uri???
    return this.http.get(`${this.baseUrl}posts/likesnr/${postId}`);
  }


  addPost(model: any, cityId, userId) {
    return this.http.post(`${this.baseUrl}${userId}/${cityId}/posts`, model).pipe(
      map((response: any) => {
        const post = response;
        if (post) {
          return post;
        }
      })

    );
  }

  addPhoto(postId, files) {
    const formData: FormData = new FormData();
    for (const file of files) {
      formData.append('File', file);
    }
    return this.http.post(`${this.baseUrl}posts/${postId}/photos`, formData).pipe(
      map((response: any) => response)

    );
  }


  sendLike(userId: number, postId: number) {
    return this.http.post(this.baseUrl + userId + '/like/' + postId, {});
  }
  sendDislike(userId: number, postId: number) {
    return this.http.delete(this.baseUrl + userId + '/like/' + postId);
  }
  isLiked(userId: number, postId: number) {
    return this.http.get(this.baseUrl + userId + '/likes/' + postId);
  }
   //hermes chiar trebe sa fac inca un request pt poze daca el deja le primeste asa aici?
  
   deletePost(id: number){
    return this.http.delete(`${this.baseUrl}deletePost/${id}`);
  }


}


// sendClickEvent(){
//   this.subject.next();
// }
//  
