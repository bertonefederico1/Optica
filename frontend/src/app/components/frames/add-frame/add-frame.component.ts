import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-frame',
  templateUrl: './add-frame.component.html',
  styleUrls: ['./add-frame.component.css']
})
export class AddFrameComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddFrameComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  frameForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
    quantityInStock: new FormControl('', Validators.required),
    design: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    utility: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    console.log("GUARDAR ARMAZON");
  }

}
