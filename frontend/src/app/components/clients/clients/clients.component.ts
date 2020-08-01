import {Component, OnInit, ViewChild} from '@angular/core';

import { ClientsService } from './../../../services/clients/clients.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from './../add-client/add-client.component';
import { ClientDataComponent } from '../client-data/client-data.component';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'nombreyapellido', 'telefono', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private clientsService: ClientsService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  dataClient(client) {
    const dialogRef = this.dialogRef.open(ClientDataComponent, {
      height: '60vw',
      width: '70vw',
      data: client
    });
  }

  editClient(){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddClientComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
  }

  addClient(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddClientComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
      })
  }

  getAll(){
    this.clientsService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        }
      )}

  applyFilter(filterValue: string){  
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }

}
  



