import { TestBed } from '@angular/core/testing';

import { SvLoginService } from './sv-login.service';

describe('SvLoginService', () => {
  let service: SvLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
