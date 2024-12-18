import { TestBed } from '@angular/core/testing';

import { ServiceDisplayCars } from './displayCars.service';
import { HttpClientModule } from '@angular/common/http';

describe('car Service', () => {
  let service: ServiceDisplayCars;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });

    service = TestBed.inject(ServiceDisplayCars);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

