import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styles: [
  ]
})
export class SelectCustomerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectCustomerComponent>,
    private customerService: CustomersService
  ) { }

  displayedColumns: string[] = ['action', 'nameAndSurname', 'telephone', 'address'];
  dataSource = null;
  customer: any;

  ngOnInit(): void {
    this.getAll();
  }

  accept(){
    this.dialogRef.close(this.customer);
  }

  setupFilter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.nombre.toLowerCase() + data.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    }
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll(){
    this.customerService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )}
}
