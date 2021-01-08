import { TestBed } from '@angular/core/testing';

import { SvProfileService } from './sv-profile.service';

describe('SvProfileService', () => {
  let service: SvProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
