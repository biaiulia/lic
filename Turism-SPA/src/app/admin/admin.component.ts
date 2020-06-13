import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { PostService } from '../services/post.service';
import { CityService } from '../services/city.service';
import { City } from '../.model/city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('editCity', { // de ce cu view child?
    static: true
  }) editCity: NgForm 
  baseUrl: string;
  city: City = {
    name: '',
    description: '',
    imageSend: undefined
  };

  constructor(private alertify: AlertifyService, private postService: PostService, private cityService: CityService) { }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editCity.dirty) {
      $event.returnValue = true;
    }
  }
  ngOnInit() {
  }
  onSelectFile(file: File) { // called each time file input changes
    this.city.imageSend = file;
  }

  addCity():void{
    debugger;
    this.cityService.addCity(this.city).subscribe((next)=>{
      this.alertify.success('Ati adaugat orsaul');
      this.editCity.reset(this.city);
      debugger;

    }, error => {
      this.alertify.error(error);
    });
  }
  getPosts(): void
  {
    this.postService.getPosts
  }

}
