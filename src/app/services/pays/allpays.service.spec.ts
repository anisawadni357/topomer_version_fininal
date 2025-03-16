import { TestBed } from '@angular/core/testing';

import { AllpaysService } from './allpays.service';

describe('AllpaysService', () => {
  let service: AllpaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllpaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
