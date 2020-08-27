import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../../../services/customers/customers.service';
import { ObrasSocialesService } from '../../../services/obrasSociales/obras-sociales.service';
import { Customer } from '../../../models/Customer';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: []
})
export class AddCustomerComponent implements OnInit{


  constructor(
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private customerService: CustomersService,
    private obraSocialService: ObrasSocialesService
  ) { }

  obrasSocialesAvailables = [];
  customer: Customer = new Customer();
  nsocio: number;
  obraSocial = '';


  ngOnInit(){  
    this.getObrasSocialesAvailables();
    if (this.data.edit) {
      this.getCustomer(this.data.customerID);
    } else {

    };
  }


  getCustomer(customerID: number){
    this.customerService.getOne(customerID)
      .subscribe(
        res => {
          this.customer = res;
        },
        err => console.log(err)
      )
  }

  addObraSocial(){
    this.customer.obrasSociales.push({
      obraSocial: this.obraSocial,
      nsocio: this.nsocio
    });
    console.log(this.customer.obrasSociales);
  }


  getObrasSocialesAvailables(){
    this.obraSocialService.getAll()
      .subscribe(
        res => this.obrasSocialesAvailables = res,
        err => console.log(err)
      )
  }


  cancel(){
    this.dialogRef.close();
  }


  onSubmit(){
    console.log(this.customer);
     this.customerService.addCustomer(this.customer)
      .subscribe(
        res => this.dialogRef.close(),
        err => console.log(err)
      )
  }

}
