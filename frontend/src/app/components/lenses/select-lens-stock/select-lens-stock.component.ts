import { Component, OnInit } from '@angular/core';
import { LensesService } from './../../../services/lenses/lenses.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-select-lens-stock',
  templateUrl: './select-lens-stock.component.html',
  styles: [
  ]
})
export class SelectLensStockComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SelectLensStockComponent>,
    private lensService: LensesService
  ) { }

  displayedColumns: string[] = ['action', 'lensID', 'sphericalValue', 'cilyndricalValue', 'axis', 'stock'];
  dataSource = null;
  lens: any;

  ngOnInit(): void {
    this.getAll();
  }

  accept(){
    this.dialogRef.close(this.lens);
  }

  setupFilter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.valorEsf + data.valorCil;
      return textToSearch.indexOf(filter) != -1;
    }
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll(){
    this.lensService.getAll('Select')
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )}
}
