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
    this.getPrescriptionsByGlasses(this.data.glassesNumber);
  }

  getPrescriptionsByGlasses(glassesNumber: number){
    this.prescriptionService.getPrescriptionByGlasses(glassesNumber)
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        })
  }

  accept(){
    this.dialogRef.close(this.prescription);
  }

}
