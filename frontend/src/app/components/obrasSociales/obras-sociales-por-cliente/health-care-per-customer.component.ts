import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-health-care-per-customer',
  templateUrl: './health-care-per-customer.component.html',
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
