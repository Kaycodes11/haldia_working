import { TestBed } from '@angular/core/testing';

import { SvTradeRegistrationService } from './sv-trade-registration.service';

describe('SvTradeRegistrationService', () => {
  let service: SvTradeRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvTradeRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
