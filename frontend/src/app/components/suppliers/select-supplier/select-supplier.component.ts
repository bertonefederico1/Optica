import { Component, OnInit } from '@angular/core';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.component.html',
  styles: [
  ]
})
export class SelectSupplierComponent implements OnInit {

  constructor(
    private supplierService: SuppliersService,
    private dialogRef: MatDialogRef<SelectSupplierComponent>
  ) { }

  displayedColumns: string[] = ['action', 'businessName', 'fantasyName', 'address', 'telephone'];
  dataSource = null;
  supplier: any;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getAll('select')
      .subscribe(res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
      })
  }

  accept(){
    this.dialogRef.close(this.supplier);
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.idProvLab + data.nombreFantasia.toLowerCase();
      return textToSearch.indexOf(filter) != -1; 
    };
  }

  applyFilter(filterValue: string){  
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }

}
