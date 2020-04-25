/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CityService } from './city.service';

describe('Service: Cities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityService]
    });
  });

  it('should ...', inject([CityService], (service: CityService) => {
    expect(service).toBeTruthy();
  }));
});
