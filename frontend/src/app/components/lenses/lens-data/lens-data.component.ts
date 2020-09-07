import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LensesService } from './../../../services/lenses/lenses.service';

@Component({
  selector: 'app-lens-data',
  templateUrl: './lens-data.component.html',
  styleUrls: []
})
export class LensDataComponent implements OnInit {

  constructor(
    private lensService: LensesService,
    private dialogRef: MatDialogRef<LensDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  lens: any;

  ngOnInit(): void {
    this.lensService.getOne(this.data.lensID)
      .subscribe(res => this.lens = res)
  }

  close(){
    this.dialogRef.close();
  }
  
}
