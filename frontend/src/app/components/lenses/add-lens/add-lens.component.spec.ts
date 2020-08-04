import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLensComponent } from './add-lens.component';

describe('AddLensComponent', () => {
  let component: AddLensComponent;
  let fixture: ComponentFixture<AddLensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
