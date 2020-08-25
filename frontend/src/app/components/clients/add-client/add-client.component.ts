import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { ClientsService } from './../../../services/clients/clients.service';
import { ObrasSocialesService } from './../../../services/obrasSociales/obras-sociales.service';

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
    private obraSocialService: ObrasSocialesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(){  
    this.getObrasSociales();
  }


  obrasSocialesAvailables = [];

  clientForm = this.fb.group ({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    obrasSociales: this.fb.array([this.fb.group({
      obraSocial: ['', Validators.required],
      nsocio: ['', Validators.required]
    })])
  });

  getObrasSociales(){
    this.obraSocialService.getAll()
      .subscribe(
        res => this.obrasSocialesAvailables = res,
        err => console.log(err)
      )
  }
  
  get obrasSociales() {
    return this.clientForm.get('obrasSociales') as FormArray;
  }


  addObraSocial(){
    const obraSocial = this.fb.group({
      obraSocial: ['', Validators.required],
      nsocio: ['', Validators.required]
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
    console.log(this.clientForm.value);
     this.clientService.addClient(this.clientForm.value)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      ) 
  }

}
