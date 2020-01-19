import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRejectionsComponent } from './modify-rejections.component';

describe('ModifyRejectionsComponent', () => {
  let component: ModifyRejectionsComponent;
  let fixture: ComponentFixture<ModifyRejectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRejectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRejectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
