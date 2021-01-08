import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reg2Component } from './reg2.component';

describe('Reg2Component', () => {
  let component: Reg2Component;
  let fixture: ComponentFixture<Reg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reg2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
