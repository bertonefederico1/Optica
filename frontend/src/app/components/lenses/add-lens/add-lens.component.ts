import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-lens',
  templateUrl: './add-lens.component.html',
  styleUrls: ['./add-lens.component.css']
})
export class AddLensComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddLensComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(){
    
  }

  lensForm = new FormGroup({
    sphericalValue: new FormControl('', Validators.required),
    cilyndricalValue: new FormControl('', Validators.required),
    refractiveIndex: new FormControl('', Validators.required),
    axis: new FormControl('', Validators.required),
    diameter: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    quantityInStock: new FormControl('', Validators.required),
    design: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    finishingTouch: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required)
  });

  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
    console.log("GUARDAR LENTE");
  }

}
