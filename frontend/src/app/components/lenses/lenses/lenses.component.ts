import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LensDataComponent } from '../lens-data/lens-data.component';
import { AddLensComponent } from './../add-lens/add-lens.component';
import { MatTableDataSource } from '@angular/material/table';
import { LensesService } from './../../../services/lenses/lenses.service';

@Component({
  selector: 'app-lenses',
  templateUrl: './lenses.component.html',
  styleUrls: []
})
export class LensesComponent implements OnInit {

  lenses: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'sphericalValue', 'cylindricalValue', 'quantityInStock', 'lensMaterial', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clientsService: any;
  
  constructor(
    private lensService: LensesService,
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
    this.lensService.getAll()
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
