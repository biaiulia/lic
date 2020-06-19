import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../.model/post';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl + 'admin/';
constructor(private http: HttpClient) { }


adminRemovePost(postId: number){ // adminservice
  return this.http.delete(this.baseUrl + 'deletePost/' + postId);
}

adminRemoveReply(replyId: number){ // adminservice
  return this.http.delete(`${this.baseUrl}deleteReply/${replyId}`);
  }

approvePost(postId: number){
  return this.http.put(this.baseUrl + 'approvePost/' + postId, {});
}
getUnapprovedPosts(cityId: number){
  return this.http.get<Post[]>(this.baseUrl+'getUnapprovedPosts/' + cityId);
}
}

