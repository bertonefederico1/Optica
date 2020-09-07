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

  dataLens(lensID: number) {
    const dialogRef = this.dialogRef.open(LensDataComponent, {
      height: '90%',
      width: '90%',
      data: {
        lensID: lensID
      }
    });
  }

  editLens(lensID: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddLensComponent, {
      height: '60vw',
      width: '60vw',
      disableClose: true,
      data: {
        edit: this.edit,
        lensID: lensID
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
      })
  }

  addLens(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddLensComponent, {
      height: '60vw',
      width: '60vw',
      disableClose: true,
      data: {
        edit: this.edit
      }
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
          this.paginator._intl.itemsPerPageLabel = "Lentes Por Página";
          this.changeRange();
          this.paginator._intl.lastPageLabel = "Última Página";
          this.paginator._intl.firstPageLabel = "Primer Página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
        }
      )}

  changeRange() {
    this.paginator._intl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
          return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    }
  }

  setupFilter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.valorEsf.toString() && data.valorCil.toString();
      return textToSearch.indexOf(filter) != -1
    }
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue; 
  }

}
