import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HstreportsComponent } from './hstreports.component';

describe('HstreportsComponent', () => {
  let component: HstreportsComponent;
  let fixture: ComponentFixture<HstreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HstreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HstreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
