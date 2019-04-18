import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesClosedComponent } from './sales-closed.component';

describe('SalesClosedComponent', () => {
  let component: SalesClosedComponent;
  let fixture: ComponentFixture<SalesClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
