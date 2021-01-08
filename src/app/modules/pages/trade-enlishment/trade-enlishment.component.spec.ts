import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeEnlishmentComponent } from './trade-enlishment.component';

describe('TradeEnlishmentComponent', () => {
  let component: TradeEnlishmentComponent;
  let fixture: ComponentFixture<TradeEnlishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeEnlishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeEnlishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
