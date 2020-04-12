import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any; // orice tip de javascript

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }
  getValues(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response; // in subscribe pasam raspunsul pe care il primim de la server care vor fi salvate in values
    }, error => {
      console.log(error); // verificam daca este vreo eroare si o punem in log daca da

    });
  }

}
