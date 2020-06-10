import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Reply } from '../.model/reply';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient, authService: AuthService) {}

  getReplies(postId): Observable <Reply[]>{
    return this.http.get<Reply[]>(`${this.baseUrl}post/${postId}/replies`);
 }
  addReply(postId, userId, model: any){
    return this.http.post(`${this.baseUrl}${userId}/reply/${postId}`, model);
  //   .pipe(
  //     map((response: any) => {
  //       return response;
  //     }
  //     )
  //   );
  }
  deleteReply(userId, id){
    return this.http.delete(`${this.baseUrl}${userId}/deleteReply/${id}`);
  }




}
