import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { LensDataComponent } from '../lens-data/lens-data.component';
import { AddLensComponent } from './../add-lens/add-lens.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lenses',
  templateUrl: './lenses.component.html',
  styleUrls: ['./lenses.component.css']
})
export class LensesComponent implements OnInit {

  lenses: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'sphericalValue', 'cylindricalValue', 'quantityInStock', 'lensMaterial', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private clientsService: ClientsService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  dataLens(lens) {
    const dialogRef = this.dialogRef.open(LensDataComponent, {
      height: '60vw',
      width: '70vw',
      data: lens
    });
  }

  editLens(){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddLensComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
  }

  addLens(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddLensComponent, {
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
    this.dataSource.filter = filterValue; 
  }

}
