import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCylindersComponent } from './reject-cylinders.component';

describe('RejectCylindersComponent', () => {
  let component: RejectCylindersComponent;
  let fixture: ComponentFixture<RejectCylindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectCylindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectCylindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
