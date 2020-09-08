import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-prescriptions-per-customer',
  templateUrl: './prescriptions-per-customer.component.html',
  styleUrls: []
})
export class PrescriptionsPerCustomerComponent implements OnChanges {

  @Input('customerID') customerID;

  constructor() { }

  ngOnChanges(){
    console.log(this.customerID)
  }

}
