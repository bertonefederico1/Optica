import { Component, OnInit } from '@angular/core';
import { GlassesService } from './../../../services/glasses/glasses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-glasses-pending',
  templateUrl: './select-glasses-pending.component.html',
  styles: [
  ]
})
export class SelectGlassesPendingComponent implements OnInit {

  constructor(
    private glassesService: GlassesService,
    private dialogRef: MatDialogRef<SelectGlassesPendingComponent>
  ) { }

  displayedColumns: string[] = ['action', 'glassesNumber', 'customer', 'dateCreation'];
  dataSource = null;
  glasses: any;

  ngOnInit(): void {
    this.getGlassesPending();
  }

  accept(){
    this.dialogRef.close(this.glasses);
  }

  getGlassesPending(){
    this.glassesService.getGlassesPending()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
      });
  }
}
