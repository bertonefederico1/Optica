import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from './../../../services/clients/clients.service';
import { ObrasSocialesService } from './../../../services/obrasSociales/obras-sociales.service';
import { Client } from './../../../models/client';


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
    private obraSocialService: ObrasSocialesService
  ) { }

  obrasSocialesAvailables = [];
  client: Client = new Client();
  nsocio: number;
  idObraSocial = '';


  ngOnInit(){  
    this.getObrasSocialesAvailables();
    if (this.data.edit) {
      this.getClient(this.data.idClient);
    } else {

    };
  }


  getClient(idClient: number){
    this.clientService.getOne(idClient)
      .subscribe(
        res => {
          this.client = res;
        },
        err => console.log(err)
      )
  }

  addObraSocial(){
    this.client.obrasSociales.push({
      obraSocial: this.idObraSocial,
      nsocio: this.nsocio
    });
  }


  getObrasSocialesAvailables(){
    this.obraSocialService.getAll()
      .subscribe(
        res => this.obrasSocialesAvailables = res,
        err => console.log(err)
      )
  }


  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
     this.clientService.addClient(this.client)
      .subscribe(
        res => this.dialogRef.close(),
        err => console.log(err)
      )
  }

}
