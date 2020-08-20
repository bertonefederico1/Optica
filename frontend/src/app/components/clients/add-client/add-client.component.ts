import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
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
    private clientService: ClientsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(){  
    
  }



  clientForm = this.fb.group ({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    obrasSociales: this.fb.array([this.fb.group({
      obraSocial: new FormControl(''),
      nsocio: new FormControl('')
    })])
  });


  get obrasSociales() {
    return this.clientForm.get('obrasSociales') as FormArray;
  }


  addObraSocial(){
    const obraSocial = this.fb.group({
      obraSocial: new FormControl(''),
      nsocio: new FormControl('')
    });
    this.obrasSociales.push(obraSocial);
  }


  removeObraSocial(index: number){
    this.obrasSociales.removeAt(index);
  }


  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
    console.log(this.clientForm);
    /* this.clientService.addClient(this.clientForm.value)
      .subscribe(
        res => this.dialogRef.close(),
        err => console.log(err)
      ) */ 
  }

}
