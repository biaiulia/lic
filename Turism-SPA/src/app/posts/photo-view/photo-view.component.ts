import {
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';
import {
  Photo
} from 'src/app/.model/photo';
import {
  Post
} from 'src/app/.model/post';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit, OnChanges {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() photos: Photo[];
  photosExist = true;
  constructor() {}

  ngOnInit() {
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }];
  }

  ngOnChanges(): void {
    if (!this.photos) {
      this.photosExist = false;
      return;
    }
    this.galleryImages = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    this.photosExist = true;
    for (const photo of this.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }
}
