import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCylindersComponent } from './rejected-cylinders.component';

describe('RejectedCylindersComponent', () => {
  let component: RejectedCylindersComponent;
  let fixture: ComponentFixture<RejectedCylindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedCylindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedCylindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
