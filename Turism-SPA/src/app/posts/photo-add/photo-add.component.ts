import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/.model/photo';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
  @Input() photos: Photo[];
  constructor() { }

  ngOnInit() {
  }

  

}
