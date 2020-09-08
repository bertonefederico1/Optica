import { Component, Input, OnChanges } from '@angular/core';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prescriptions-per-customer',
  templateUrl: './prescriptions-per-customer.component.html',
  styleUrls: []
})
export class PrescriptionsPerCustomerComponent implements OnChanges {

  @Input('customerID') customerID;

  constructor(
    private prescriptionsService: PrescriptionsService
  ) { }

  displayedColumns: string[] = ['prescriptionNumber', 'prescriptionDate', 'doctorName', 'actions'];
  dataSource = null;
  prescription: any;


  ngOnChanges(){
    this.getPrescriptionsBycustomerID();
  }

  getPrescriptionsBycustomerID(){
    this.prescriptionsService.getPrescriptionsBycustomerID(this.customerID)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.prescription = res;
      });
  }

  addPrescription(){

  }

}
