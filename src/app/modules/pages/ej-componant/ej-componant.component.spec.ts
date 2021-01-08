import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjComponantComponent } from './ej-componant.component';

describe('EjComponantComponent', () => {
  let component: EjComponantComponent;
  let fixture: ComponentFixture<EjComponantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjComponantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjComponantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
