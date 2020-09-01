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

  dataSupplier(supplierID: number){
    const dialogRef = this.dialogRef.open(SupplierDataComponent, {
      height: '90%',
      width: '90%',
      data: {
        supplierID: supplierID
      }
    });
  }

  editSupplier(supplierID: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddSupplierComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: {
        edit: this.edit,
        supplierID: supplierID
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
    if (confirm("¿Seguro que desea eliminar el proveedor/laboratorio?")) {
      this.supplierService.deleteSupplier(supplierID)
        .subscribe(
          res => this.getAll()
        )
    }
  }

  changeRange() {
    this.paginator._intl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
          return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    }
  }

  getAll(){
    this.supplierService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Proveedores/Laboratorios Por Página";
          this.changeRange();
          this.paginator._intl.lastPageLabel = "Última Página";
          this.paginator._intl.firstPageLabel = "Primer Página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
        }
      )}

  setupFilter() {
    const column1 = 'codigo';
    const column2 = 'nombreFantasia';
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      console.log(data)
      /* const textToSearch = data[column1].toLowerCase();
      return textToSearch.indexOf(filter) !== -1; */
    };
  }

  applyFilter(filterValue: string){  
    this.dataSource.filter = filterValue; 
  }

}
