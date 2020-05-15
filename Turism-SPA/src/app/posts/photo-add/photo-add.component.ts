import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/.model/photo';
import {FileUploader} from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
  @Input() photos: Photo[];
   uploader: FileUploader; //= new FileUploader({url:URL});
   hasBaseDropZoneOver = false;
  baseUrl = environment;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
  }

fileOverBase(e:any): void{
  this.hasBaseDropZoneOver=e;
}
initializeUploader(){
  this.uploader = new FileUploader({
    url: this.baseUrl + 'posts/', //+ this.photos.postId + '/photos',
              //'users/' + this.authService.decodedToken.nameId + '/photos', TREBE ADAUGAT AICI URL U PT BACKEND
    authToken: 'Bearer' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024 // ca sa fie de 10 mb fisieru

  });
}
}
