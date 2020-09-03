import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FramesService } from './../../../services/frames/frames.service';

@Component({
  selector: 'app-data-frame',
  templateUrl: './data-frame.component.html',
  styleUrls: []
})
export class DataFrameComponent implements OnInit {

  constructor(
    private framesService: FramesService,
    private dialogRef: MatDialogRef<DataFrameComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  frame: any;

  ngOnInit(): void {
    this.framesService.getOne(this.data.frameID)
      .subscribe(res => this.frame = res);
  }

  close(){
    this.dialogRef.close();
  }

}
