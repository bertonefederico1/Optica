import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FramesService } from './../../../services/frames/frames.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataFrameComponent } from './../data-frame/data-frame.component';
import { AddFrameComponent } from './../add-frame/add-frame.component';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: []
})
export class FramesComponent implements OnInit {

  frames: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['code', 'brand', 'model', 'quantityInStock', 'actions'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private framesService: FramesService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  dataFrame(frameID: number) {
    const dialogRef = this.dialogRef.open(DataFrameComponent, {
      height: '60vw',
      width: '70vw',
      data: {
        edit: this.edit,
        frameID: frameID
      }
    });
  }

  editFrame(frameID: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddFrameComponent, {
      height: '100%',
      width: '100%',
      disableClose: true,
      data: {
        edit: this.edit,
        frameID: frameID
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  deleteFrame(frameID: number){
    if (confirm("¿Seguro que desea eliminar el armazón?")) {
      this.framesService.deleteFrame(frameID)
      .subscribe(res => this.getAll());
    }
  }

  addFrame(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddFrameComponent, {
      height: '100%',
      width: '100%',
      disableClose: true,
      data: {
        edit: this.edit
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

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

  getAll(){
    this.framesService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Armazones Por Página";
          this.changeRange();
          this.paginator._intl.lastPageLabel = "Última Página";
          this.paginator._intl.firstPageLabel = "Primer Página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
        }
      )}

  setupFilter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.marca.toLowerCase() + data.modelo.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    }
  }
  
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue; 
  }

  
}
