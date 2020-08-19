import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from './../../../services/clients/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientService: ClientsService
  ) { }

  ngOnInit(){
    
  }

  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    nsocio: new FormControl('', Validators.required),
    obraSocial: new FormControl('', Validators.required)
  });

  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
    this.clientService.addClient(this.clientForm.value)
      .subscribe(
        res => this.dialogRef.close(),
        err => console.log(err)
      )
  }

}
