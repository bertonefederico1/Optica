import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from './../../../services/customers/customers.service';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: []
})
export class CustomerDataComponent implements OnInit {

 constructor(
    private dialogRef: MatDialogRef<CustomerDataComponent>,
    private customerService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public customerID
  ) { }

  ngOnInit(): void {
    this.getOne(this.customerID);
    
  }

  customer: any;

  getOne(customerID: number){
    this.customerService.getOne(customerID)
      .subscribe(
        res => this.customer = res,
        err => console.log(err)
      )
  }

  close(){
    this.dialogRef.close();
  }
 
}
