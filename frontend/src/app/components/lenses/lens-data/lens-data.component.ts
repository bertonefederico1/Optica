import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lens-data',
  templateUrl: './lens-data.component.html',
  styleUrls: ['./lens-data.component.css']
})
export class LensDataComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LensDataComponent>,
    @Inject(MAT_DIALOG_DATA) public lens
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
  
}
