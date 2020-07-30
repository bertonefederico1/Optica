import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

  constructor(
    private dialogRef: MatDialogRef<AddClientComponent>
  ) { }

  clientForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
    nsocio: new FormControl('')
  });

  cancel(){
    this.dialogRef.close();
  }

onSubmit(){
    console.log(this.clientForm.value);
    console.log("asd");
  }

}
