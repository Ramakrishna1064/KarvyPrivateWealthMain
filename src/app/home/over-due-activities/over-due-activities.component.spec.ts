import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDueActivitiesComponent } from './over-due-activities.component';

describe('OverDueActivitiesComponent', () => {
  let component: OverDueActivitiesComponent;
  let fixture: ComponentFixture<OverDueActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverDueActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverDueActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
