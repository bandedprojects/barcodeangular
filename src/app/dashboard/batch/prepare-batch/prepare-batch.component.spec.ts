import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareBatchComponent } from './prepare-batch.component';

describe('PrepareBatchComponent', () => {
  let component: PrepareBatchComponent;
  let fixture: ComponentFixture<PrepareBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
