import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPrescriptionComponent } from './../add-prescription/add-prescription.component';
import { DataPrescriptionComponent } from './../data-prescription/data-prescription.component';
import { LoginService } from './../../../services/login/login.service';

@Component({
  selector: 'app-prescriptions-per-customer',
  templateUrl: './prescriptions-per-customer.component.html',
  styleUrls: []
})
export class PrescriptionsPerCustomerComponent implements OnInit, OnChanges {

  @Input('customerID') customerID;

  constructor(
    private prescriptionsService: PrescriptionsService,
    private dialogRef: MatDialog,
    private loginService: LoginService
  ) { }

  displayedColumns: string[] = ['prescriptionNumber', 'prescriptionDate', 'doctorName', 'actions'];
  dataSource = null;
  dialogConfig = new MatDialogConfig();
  edit: boolean;
  userRole: string;
  
  ngOnInit(){
    this.getUserRole();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.autoFocus = true;  
  }

  getUserRole(){
    this.loginService.getUserRole()
      .subscribe(res => this.userRole = res.payload.role)
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

  dataPrescription(prescriptionNumber: number){
    this.dialogConfig.data = {
      prescriptionNumber: prescriptionNumber
    }
    this.dialogRef.open(DataPrescriptionComponent, this.dialogConfig);
  }

  addPrescription(){
    this.edit = false;
    this.dialogConfig.data = {
      customerID: this.customerID,
      edit: this.edit
    }
    const dialogRef = this.dialogRef.open(AddPrescriptionComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getPrescriptionsBycustomerID());
  }

  editPrescription(prescriptionNumber: number){
    this.edit = true;
    this.dialogConfig.data = {
      customerID: this.customerID,
      edit: this.edit,
      prescriptionNumber: prescriptionNumber
    }
    const dialogRef = this.dialogRef.open(AddPrescriptionComponent, this.dialogConfig)
    dialogRef.afterClosed()
      .subscribe(res => this.getPrescriptionsBycustomerID());
  }

  deletePrescription(prescriptionNumber: number){
    if(confirm("¿Seguro que desea eliminar la receta?")){
      this.prescriptionsService.deletePrescription(prescriptionNumber)
      .subscribe(res => this.getPrescriptionsBycustomerID());
    }
  }

}
