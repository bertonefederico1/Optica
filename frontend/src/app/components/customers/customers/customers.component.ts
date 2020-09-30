import {Component, OnInit, ViewChild} from '@angular/core';

import { CustomersService } from '../../../services/customers/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDataComponent } from '../customer-data/customer-data.component';
import { Customer } from 'src/app/models/Customer';
import { LoginService } from './../../../services/login/login.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: []
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'nombreyapellido', 'telefono', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private customerService: CustomersService,
    private dialogRef: MatDialog,
    private loginService: LoginService
  ){ }

  userRole: string;
  

  ngOnInit() {
    this.getUserRole();
    this.getAll();
  }

  getUserRole(){
    this.loginService.getUserRole()
      .subscribe(res => this.userRole = res.payload.role)
  }

  dataCustomer(customerID) {
    const dialogRef = this.dialogRef.open(CustomerDataComponent, {
      height: '90%',
      width: '90%',
      data: customerID
    });
  }


  deleteCustomer(customerID: number){
    if (confirm('¿Seguro que desea eliminar el cliente?')){
      this.customerService.deleteCustomer(customerID)
      .subscribe(
        res => this.getAll(),
        err => console.log(err)
      )
    }
  }


  editCustomer(customerID: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddCustomerComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: {
        edit: this.edit,
        customerID: customerID
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
      })
  }


  addCustomer(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddCustomerComponent, {
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
    this.customerService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = "Clientes Por Página";
          this.changeRange();
          this.paginator._intl.lastPageLabel = "Última Página";
          this.paginator._intl.firstPageLabel = "Primer Página";
          this.paginator._intl.nextPageLabel = "Siguiente";
          this.paginator._intl.previousPageLabel = "Anterior";
        }
      )}


  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
  



