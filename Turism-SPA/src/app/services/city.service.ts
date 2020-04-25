import {
  Injectable
} from '@angular/core';
import {
  City
} from '../.model/city';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  environment
} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = environment.apiUrl;

  //cities: City[];
  constructor(private http: HttpClient) {}

  getCities(): Observable < City[] > {
    return this.http.get < City[] > (this.baseUrl + 'cities');
  }
  getCity(id): Observable < City[] > {
    return this.http.get < City[] > (this.baseUrl + 'cities/' + id);
  }
}




/*constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
}

getUser(id): Observable<User[]>{ // de ce facem asa
return this.http.get<User[]>(this.baseUrl + 'users/' + id, httpOptions);
}

}*/
