import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-obras-sociales-por-cliente',
  templateUrl: './obras-sociales-por-cliente.component.html',
  styleUrls: []
})
export class ObrasSocialesPorClienteComponent implements OnInit {

  @Input('obrasSocialesDelCliente') obrasSocialesDelCliente = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
