import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObraSocialComponent } from './add-obra-social.component';

describe('AddObraSocialComponent', () => {
  let component: AddObraSocialComponent;
  let fixture: ComponentFixture<AddObraSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObraSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
