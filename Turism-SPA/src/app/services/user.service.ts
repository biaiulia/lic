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

getUser(id): Observable<User[]>{ // de ce facem asa
  return this.http.get<User[]>(this.baseUrl + 'users/' + id);
}

}
