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
    //.pipe(map(this.mapCities)); // map de aici e diferit de .map la array
  }

  getCity(name): Observable < City > {
    return this.http.get < City > (this.baseUrl + name);
  }

  searchCities(search: string): Observable < City[] > {
    return this.http.get < City[] > (this.baseUrl + 'cities/' + search);
  }

  addCity(city: City): Observable < City > {
    const formData: FormData = new FormData();
    formData.append('File', city.imageSend);
    formData.append('Name', city.name);
    formData.append('Description', city.description);
    return this.http.post < City > (this.baseUrl + 'admin/addCity', formData);

  }
  deleteCity(cityId: number){
    return this.http.delete(`${this.baseUrl}admin/deleteCity/${cityId}`);
  }

  updateCity(id: number, city: City){
    return this.http.put<City>(this.baseUrl + 'admin/cityUpdate/' + id, city);
  }

  updatePhoto(id: number, file: File){
    const formData: FormData = new FormData();
    formData.append('File', file);
    return this.http.put<City>(this.baseUrl + 'admin/cityPhoto/' + id, formData);
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
