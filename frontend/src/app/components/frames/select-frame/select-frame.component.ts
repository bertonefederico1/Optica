import { Component, OnInit } from '@angular/core';
import { FramesService } from './../../../services/frames/frames.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-select-frame',
  templateUrl: './select-frame.component.html',
  styles: [
  ]
})
export class SelectFrameComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SelectFrameComponent>,
    private frameService: FramesService
  ) { }

  displayedColumns: string[] = ['action', 'frameID', 'brand', 'model'];
  dataSource = null;
  frame: any;

  ngOnInit(): void {
    this.getAll();
  }

  accept(){
    this.dialogRef.close(this.frame);
  }

  setupFilter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.marca.toLowerCase() + data.modelo.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    }
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll(){
    this.frameService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )}

}
