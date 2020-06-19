import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import {
  JwtHelperService
} from '@auth0/angular-jwt';
import {
  environment
} from 'src/environments/environment';
import {
  BehaviorSubject
} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerMode = new BehaviorSubject(false);
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe( // functia ia rezultatu si il mapeaza
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token); // ????
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
    // luam de la server observable ul si il transformam
  }


  register(model: any) { // model doar salveaza username ul si parola ca sa le paseze
    return this.http.post(this.baseUrl + 'register', model); // returneaza un
    // observable. trebe sa facem subscribe din componenta ca sa o putem folosi

  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token); // daca e expirat arata false si daca nu e arata true
  }

  isAdmin(role: string): boolean{

    if(this.decodedToken.role === role){
      return true;
    }
    return false;

    }
    changePassword(model:any){
      return this.http.put(this.baseUrl + 'auth/ChangePassword', model);
    }

    roleCheck(allowRole): boolean {
      let isAllowed = false;
      const userRoles = this.decodedToken.role as Array < string > ; // ceee??? asa luam rolurile
      allowRole.array.forEach(element => {
        if (userRoles.includes(element)) {
          isAllowed = true;
          return isAllowed;
        }
      });
      return isAllowed;
    }
  

}
