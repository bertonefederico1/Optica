import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrescriptionsService } from './../../../services/prescriptions/prescriptions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: []
})
export class AddPrescriptionComponent implements OnInit {

  constructor(
    private prescriptionsService: PrescriptionsService,
    public dialogRef: MatDialogRef<AddPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  prescriptionForm = new FormGroup({
    customerID: new FormControl(this.data.customerID, Validators.required),
    doctorName: new FormControl('', Validators.required),
    prescriptionObs: new FormControl('', Validators.required),
    sphericalValueRE: new FormControl('', Validators.required),
    cylindricalValueRE: new FormControl('', Validators.required),
    axisRE: new FormControl('', Validators.required),
    sphericalValueLE: new FormControl('', Validators.required),
    cylindricalValueLE: new FormControl('', Validators.required),
    axisLE: new FormControl('', Validators.required),
    farValueDIP: new FormControl('', Validators.required),
    nearValueDIP: new FormControl('', Validators.required),
    addValue: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  onSubmit(){
    this.prescriptionsService.addPrescription(this.prescriptionForm.value)
      .subscribe(res => this.dialogRef.close());
  }

  cancel(){

  }
  

}
