import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HealthCaresService } from './../../../services/healthCares/health-cares.service';

@Component({
  selector: 'app-add-health-care',
  templateUrl: './add-health-care.component.html',
  styleUrls: []
})
export class AddHealthCareComponent implements OnInit {

  constructor(
    private healthCareService: HealthCaresService,
    private dialogRef: MatDialogRef<AddHealthCareComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  healthCare: any;
  healthCareForm = new FormGroup({
    name: new FormControl('', Validators.required),
    billingPeriod: new FormControl('', Validators.required),
    numberGlassesPerPeriod: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if(this.data.edit){
      this.healthCareService.getOne(this.data.healthCareID)
        .subscribe(res => {
          this.healthCare = res; 
          this.setData();
        });
    }
  }

  setData(){
    this.healthCareForm.patchValue({
      name: this.healthCare.nombre,
      billingPeriod: this.healthCare.periodoFacMeses,
      numberGlassesPerPeriod: this.healthCare.cantFacPeriodo
    })
  }


  onSubmit(){
    if (this.data.edit){
      this.healthCareService.editHealthCare(this.healthCareForm.value, this.data.healthCareID)
      .subscribe(
        res => {
          this.dialogRef.close();
        },
        err => alert("Verifique los datos ingresados")
      )
    } else {
      this.healthCareService.addHealthCare(this.healthCareForm.value)
      .subscribe(
        res => {
          this.dialogRef.close();
        },
        err => alert("Verifique los datos ingresados")
      )
    }
    
  }

  cancel(){
    this.dialogRef.close();
  }
}
