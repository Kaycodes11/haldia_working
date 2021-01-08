import { TestBed } from '@angular/core/testing';

import { SvRegisterService } from './sv-register.service';

describe('SvRegisterService', () => {
  let service: SvRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
