import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWizard2Component } from './form-wizard2.component';

describe('FormWizard2Component', () => {
  let component: FormWizard2Component;
  let fixture: ComponentFixture<FormWizard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWizard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWizard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
