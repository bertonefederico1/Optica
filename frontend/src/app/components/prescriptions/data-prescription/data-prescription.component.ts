import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';

@Component({
  selector: 'app-data-prescription',
  templateUrl: './data-prescription.component.html',
  styles: []
})
export class DataPrescriptionComponent implements OnInit {

  constructor(
    private prescriptionsService: PrescriptionsService,
    public dialogRef: MatDialogRef<DataPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  prescription: any;

  ngOnInit(): void {
    this.prescriptionsService.getOne(this.data.prescriptionNumber)
      .subscribe(res => this.prescription = res);
  }

}
