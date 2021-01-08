import { TestBed } from '@angular/core/testing';

import { SvAuthGuardService } from './sv-auth-guard.service';

describe('SvAuthGuardService', () => {
  let service: SvAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
