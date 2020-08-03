import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';
import { AddSupplierComponent } from './../add-supplier/add-supplier.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'nombreyapellido', 'telefono', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private supplierService: SuppliersService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  editClient(){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddSupplierComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
  }

  addSupplier(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddSupplierComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
        console.log(res);
      })
  }

  getAll(){
    this.supplierService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        }
      )}

  applyFilter(filterValue: string){  
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }

}
