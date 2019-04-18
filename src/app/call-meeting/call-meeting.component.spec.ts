import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMeetingComponent } from './call-meeting.component';

describe('CallMeetingComponent', () => {
  let component: CallMeetingComponent;
  let fixture: ComponentFixture<CallMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
