import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../.model/user';

// const httpOptions = {
//   headers: new HttpHeaders({ // ?????
//     Authorization: 'Bearer ' + localStorage.getItem('token') // ca in postman

//   }) 
// } am pus astea in app.module

@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl;


constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl + 'users');
}
getUsersByPoints(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl + 'users/userByPoints')
}

getUser(id): Observable<User>{ // de ce facem asa
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
getUserByName(userName: string): Observable<User>{ // de ce facem asa
return this.http.get<User>(this.baseUrl + 'users/username/' + userName);
}



updateUser(id: number, user: User){
  return this.http.put<User>(this.baseUrl + 'users/' + id, user);
}
updatePhoto(id: number, file: File){
  const formData: FormData = new FormData();
  formData.append('File', file);
  return this.http.put<User>(this.baseUrl + 'users/photo/' + id, formData);
}

deleteUser(userName: string){
  return this.http.delete<User>(this.baseUrl+ 'admin/deleteUser/'+ userName);
}



}
