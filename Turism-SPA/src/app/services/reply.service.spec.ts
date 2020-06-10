/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReplyService } from './reply.service';

describe('Service: Reply', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplyService]
    });
  });

  it('should ...', inject([ReplyService], (service: ReplyService) => {
    expect(service).toBeTruthy();
  }));
});
