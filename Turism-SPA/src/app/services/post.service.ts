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
  Observable
} from 'rxjs';
import {
  Post
} from '../.model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPosts(cityId): Observable < Post[] > { // 
    return this.http.get < Post[] > (`${this.baseUrl}cities/${cityId}/posts`);
  }
  getPost(id): Observable < Post > {
    return this.http.get < Post > (this.baseUrl + 'post/' + id);
  }
}
