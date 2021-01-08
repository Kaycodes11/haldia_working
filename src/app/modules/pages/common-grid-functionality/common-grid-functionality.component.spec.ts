import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonGridFunctionalityComponent } from './common-grid-functionality.component';

describe('CommonGridFunctionalityComponent', () => {
  let component: CommonGridFunctionalityComponent;
  let fixture: ComponentFixture<CommonGridFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonGridFunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonGridFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
