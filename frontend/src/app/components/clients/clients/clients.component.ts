import {Component, OnInit, ViewChild} from '@angular/core';

import { ClientsService } from './../../../services/clients/clients.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from './../add-client/add-client.component';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
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

  openDialog(){
    const dialogRef = this.dialogRef.open(AddClientComponent, {
      width: '70vw'
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
  



