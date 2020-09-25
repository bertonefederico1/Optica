import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-prescriptions',
  templateUrl: './select-prescriptions.component.html',
  styles: [
  ]
})
export class SelectPrescriptionsComponent implements OnInit {

  constructor(
    private prescriptionService: PrescriptionsService,
    public dialogRef: MatDialogRef<SelectPrescriptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  displayedColumns: string[] = ['action', 'prescriptionNumber', 'prescriptionDate', 'doctorName'];
  dataSource = null;
  prescription: any;

  ngOnInit(): void {
    switch(this.data.type){
      case 'newGlasses': {
        this.getPrescriptionByCustomer(this.data.customer.idCliente);
        break;
      }
      case 'newOrder': {
        this.getPrescriptionsByGlasses(this.data.glassesNumber);
      }
    };
  }

  getPrescriptionByCustomer(customerID: number){
    this.prescriptionService.getPrescriptionsBycustomerID(customerID)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
      });
  }

  getPrescriptionsByGlasses(glassesNumber: number){
    this.prescriptionService.getPrescriptionByGlasses(glassesNumber)
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        });
  }

  accept(){
    switch(this.data.type){
      case 'newGlasses': {
        this.dialogRef.close(this.prescription);
        break;
      }
      case 'newOrder': {
        this.dialogRef.close(this.prescription.recetum);
        break;
      }
    }
   
  }

}
