import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWizard2Component } from './ng-wizard2.component';

describe('NgWizard2Component', () => {
  let component: NgWizard2Component;
  let fixture: ComponentFixture<NgWizard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgWizard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWizard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
