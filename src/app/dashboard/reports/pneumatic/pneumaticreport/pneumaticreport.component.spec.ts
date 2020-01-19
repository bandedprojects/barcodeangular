import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumaticreportComponent } from './pneumaticreport.component';

describe('PneumaticreportComponent', () => {
  let component: PneumaticreportComponent;
  let fixture: ComponentFixture<PneumaticreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PneumaticreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PneumaticreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
