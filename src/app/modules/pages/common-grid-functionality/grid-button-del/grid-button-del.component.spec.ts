import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridButtonDelComponent } from './grid-button-del.component';

describe('GridButtonDelComponent', () => {
  let component: GridButtonDelComponent;
  let fixture: ComponentFixture<GridButtonDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridButtonDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridButtonDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
