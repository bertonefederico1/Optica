import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-obras-sociales-por-cliente',
  templateUrl: './obras-sociales-por-cliente.component.html',
  styleUrls: []
})
export class ObrasSocialesPorClienteComponent implements OnInit {

  @Input('obrasSocialesDelCliente') obrasSocialesDelCliente = [];
  @Output() deleteOS = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    
  }

  deleteObraSocial(obraSocialID){
    this.obrasSocialesDelCliente.map((os, index) => {
      if (os.obraSocial.idObraSocial === obraSocialID) {
        this.obrasSocialesDelCliente.splice(index, 1);
      };
    })
    this.deleteOS.emit(this.obrasSocialesDelCliente);
  }

}
