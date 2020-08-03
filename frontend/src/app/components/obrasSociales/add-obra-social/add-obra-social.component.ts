import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-obra-social',
  templateUrl: './add-obra-social.component.html',
  styleUrls: ['./add-obra-social.component.css']
})
export class AddObraSocialComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddObraSocialComponent>,
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
