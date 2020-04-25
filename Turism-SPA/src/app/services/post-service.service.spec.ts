/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostServiceService } from './post-service.service';

describe('Service: PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostServiceService]
    });
  });

  it('should ...', inject([PostServiceService], (service: PostServiceService) => {
    expect(service).toBeTruthy();
  }));
});
