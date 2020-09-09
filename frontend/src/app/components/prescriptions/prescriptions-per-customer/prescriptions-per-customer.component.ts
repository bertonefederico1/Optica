import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPrescriptionComponent } from './../add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescriptions-per-customer',
  templateUrl: './prescriptions-per-customer.component.html',
  styleUrls: []
})
export class PrescriptionsPerCustomerComponent implements OnInit, OnChanges {

  @Input('customerID') customerID;

  constructor(
    private prescriptionsService: PrescriptionsService,
    private dialogRef: MatDialog
  ) { }

  displayedColumns: string[] = ['prescriptionNumber', 'prescriptionDate', 'doctorName', 'actions'];
  dataSource = null;
  dialogConfig = new MatDialogConfig();
  edit: boolean = false;
  
  ngOnInit(){
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.autoFocus = true;  
  }

  ngOnChanges(){
    this.getPrescriptionsBycustomerID();
  }

  getPrescriptionsBycustomerID(){
    this.prescriptionsService.getPrescriptionsBycustomerID(this.customerID)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
      });
  }

  addPrescription(){
    this.dialogConfig.data = {
      customerID: this.customerID
    }
    this.dialogRef.open(AddPrescriptionComponent, this.dialogConfig);
  }

}
