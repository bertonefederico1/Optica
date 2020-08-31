import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-health-care',
  templateUrl: './add-health-care.component.html',
  styleUrls: []
})
export class AddHealthCareComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddHealthCareComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  obraSocialForm = new FormGroup({
    name: new FormControl('', Validators.required),
    billingPeriod: new FormControl('', Validators.required),
    numberGlassesPerPeriod: new FormControl('', Validators.required)
  });


  onSubmit(){
    console.log("GUARDAR OBRA SOCIAL");
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }
}
