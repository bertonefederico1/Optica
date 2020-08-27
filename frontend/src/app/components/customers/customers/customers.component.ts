import {Component, OnInit, ViewChild} from '@angular/core';

import { CustomersService } from '../../../services/customers/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDataComponent } from '../customer-data/customer-data.component';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: []
})
export class CustomersComponent implements OnInit {

  customers: any[] = [];
  edit: boolean;
  length: number;
  displayedColumns: string[] = ['codigo', 'nombreyapellido', 'telefono', 'acciones'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private customerService: CustomersService,
    private dialogRef: MatDialog
  ){ }
  
  ngOnInit() {
    this.getAll();
  }

  dataCustomer(customerID) {
    const dialogRef = this.dialogRef.open(CustomerDataComponent, {
      height: '60vw',
      width: '70vw',
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

  getAll(){
    this.customerService.getAll()
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
  



