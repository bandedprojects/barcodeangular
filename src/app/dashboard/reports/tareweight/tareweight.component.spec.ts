import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareweightComponent } from './tareweight.component';

describe('TareweightComponent', () => {
  let component: TareweightComponent;
  let fixture: ComponentFixture<TareweightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareweightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
