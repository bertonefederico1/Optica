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
  styleUrls: ['./frames.component.css']
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

  dataFrame(frame) {
    const dialogRef = this.dialogRef.open(DataFrameComponent, {
      height: '60vw',
      width: '70vw',
      data: frame
    });
  }

  editFrame(){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddFrameComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
  }

  addFrame(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddFrameComponent, {
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
    this.framesService.getAll()
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
