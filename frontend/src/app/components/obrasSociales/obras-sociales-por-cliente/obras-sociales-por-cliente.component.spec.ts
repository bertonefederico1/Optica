import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasSocialesPorClienteComponent } from './obras-sociales-por-cliente.component';

describe('ObrasSocialesPorClienteComponent', () => {
  let component: ObrasSocialesPorClienteComponent;
  let fixture: ComponentFixture<ObrasSocialesPorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasSocialesPorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasSocialesPorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
