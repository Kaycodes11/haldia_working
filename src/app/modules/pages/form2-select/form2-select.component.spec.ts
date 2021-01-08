import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2SelectComponent } from './form2-select.component';

describe('Form2SelectComponent', () => {
  let component: Form2SelectComponent;
  let fixture: ComponentFixture<Form2SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form2SelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form2SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
