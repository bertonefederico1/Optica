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
    addValue: new FormControl(0, Validators.required)
  });
  prescription: any;

  ngOnInit(): void {
    if(this.data.edit){
      this.prescriptionsService.getOne(this.data.prescriptionNumber)
        .subscribe(res => {
          this.prescription = res;
          this.setData();
        })
    }
  }

  setData(){
    this.prescriptionForm.patchValue({
      doctorName: this.prescription.nombreMedico,
      prescriptionObs: this.prescription.obsReceta,
      sphericalValueRE: this.prescription.valorEsfOD,
      cylindricalValueRE: this.prescription.valorCilOD,
      axisRE: this.prescription.ejeOD,
      sphericalValueLE: this.prescription.valorEsfOI,
      cylindricalValueLE: this.prescription.valorCilOI,
      axisLE: this.prescription.ejeOI,
      farValueDIP: this.prescription.valorDIPLejos,
      nearValueDIP: this.prescription.valorDIPCerca,
      addValue: this.prescription.valorADD
    })
  }

  onSubmit(){
    if(this.data.edit){
      this.prescriptionsService.editPrescription(this.prescriptionForm.value, this.data.prescriptionNumber)
      .subscribe(
        res => this.dialogRef.close(),
        err => alert("Verifique los datos ingresados")
        );
    } else {
      this.prescriptionsService.addPrescription(this.prescriptionForm.value)
      .subscribe(
        res => this.dialogRef.close(),
        err => alert("Verifique los datos ingresados"));
    }
  }

  

}
