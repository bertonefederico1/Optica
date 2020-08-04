import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensDataComponent } from './lens-data.component';

describe('LensDataComponent', () => {
  let component: LensDataComponent;
  let fixture: ComponentFixture<LensDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
