import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-frame',
  templateUrl: './data-frame.component.html',
  styleUrls: []
})
export class DataFrameComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DataFrameComponent>,
    @Inject(MAT_DIALOG_DATA) public frame
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
