import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obras-sociales-por-cliente',
  templateUrl: './obras-sociales-por-cliente.component.html',
  styleUrls: ['./obras-sociales-por-cliente.component.css']
})
export class ObrasSocialesPorClienteComponent implements OnInit {

  @Input('obrasSocialesDelCliente') obrasSocialesDelCliente = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.obrasSocialesDelCliente);
  }

}
