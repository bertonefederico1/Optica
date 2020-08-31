import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-health-care-per-customer',
  templateUrl: './health-care-per-customer.component.html',
  styleUrls: []
})
export class HealthCaresPerCustomerComponent implements OnInit {

  @Input('healthCaresCustomer') healthCaresCustomer = [];
  @Output() deleteOS = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    
  }

  deleteObraSocial(obraSocialID){
    this.healthCaresCustomer.map((os, index) => {
      if (os.obraSocial.idObraSocial === obraSocialID) {
        this.healthCaresCustomer.splice(index, 1);
      };
    })
    this.deleteOS.emit(this.healthCaresCustomer);
  }

}
