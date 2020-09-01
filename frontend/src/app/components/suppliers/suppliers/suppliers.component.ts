import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';
import { AddSupplierComponent } from './../add-supplier/add-supplier.component';
import { MatTableDataSource } from '@angular/material/table';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { SupplierDataComponent } from '../supplier-data/supplier-data.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: []
})
export class SuppliersComponent implements OnInit {

  suppliers: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'nombrefantasia', 'telefono', 'email', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private supplierService: SuppliersService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  dataSupplier(){
    const dialogRef = this.dialogRef.open(SupplierDataComponent, {
      height: '60vw',
      width: '70vw'
    });
  }

  editSupplier(){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddSupplierComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: {
        edit: this.edit
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
      })
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
      })
  }

  deleteSupplier(supplierID: number){
    console.log(supplierID)
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
    this.dataSource.filter = filterValue; 
  }

}
