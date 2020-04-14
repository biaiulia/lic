import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseUrl + 'login', model).pipe( // functia ia rezultatu si il mapeaza
    map((response: any) =>{
      const user = response;
      if (user){
        localStorage.setItem('token', user.token); // ????
      }
    })
  );
// luam de la server observable ul si il transformam
}

register(model: any) { // model doar salveaza username ul si parola ca sa le paseze
  return this.http.post(this.baseUrl + 'register', model); // returneaza un
  // observable. trebe sa facem subscribe din componenta ca sa o putem folosi

}

}
