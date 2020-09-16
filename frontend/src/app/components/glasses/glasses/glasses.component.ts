import { Component, OnInit } from '@angular/core';
import { GlassesService } from './../../../services/glasses/glasses.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styles: [
  ]
})
export class GlassesComponent implements OnInit {

  constructor(
    private glassesService: GlassesService
  ) { }

  displayedColumns: string[] = ['nameAndSurname', 'prescriptionNumber', 'expectedDeliveryDate', 'remainingAmount', 'actions'];
  dataSource = null;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.glassesService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )
  }

}
