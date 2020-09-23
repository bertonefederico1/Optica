import { Component, Inject, OnInit } from '@angular/core';
import { GlassesService } from './../../../services/glasses/glasses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-glasses',
  templateUrl: './data-glasses.component.html',
  styles: [
  ]
})
export class DataGlassesComponent implements OnInit {

  constructor(
    private glassesService: GlassesService,
    private dialogRef: MatDialogRef<DataGlassesComponent>,
    @Inject (MAT_DIALOG_DATA) public data
  ) { }

  glasses: any;

  ngOnInit(): void {
    this.getOne(this.data.glassesNumber)
  }

  getOne(glassesNumber: number){
    this.glassesService.getOne(glassesNumber)
      .subscribe(res => {
        this.glasses = res;
        console.log(this.glasses);
      });
  }

}
