import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFrameComponent } from './data-frame.component';

describe('DataFrameComponent', () => {
  let component: DataFrameComponent;
  let fixture: ComponentFixture<DataFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
