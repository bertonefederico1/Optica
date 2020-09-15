import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectCustomerComponent } from './../../customers/select-customer/select-customer.component';
import { fromEvent } from 'rxjs';
import { CustomersService } from './../../../services/customers/customers.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: []
})
export class PrescriptionsComponent implements OnInit {

  dialogConfig = new MatDialogConfig();
  openModalSelectCliente$ = fromEvent<KeyboardEvent>(document, 'keyup');
  customer: any;

  constructor(
    private customersService: CustomersService,
    private dialogRef: MatDialog
  ) { }


  customerForm = new FormGroup({
    nameAndSurname: new FormControl(''),
    telephone: new FormControl(''),
    address: new FormControl('')
  })

  ngOnInit(): void {
    this.openModalSelectCliente$
      .subscribe(res => {
        if(res.key === '+'){
          this.addCustomer();
        }
      })
  }

  setData(){
    this.customerForm.patchValue({
      nameAndSurname: this.customer.nombre + ' ' + this.customer.apellido,
      telephone: this.customer.telefono,
      address: this.customer.domicilio
    })
  }

  addCustomer(){
    this.dialogConfig.height = '100%';
    this.dialogConfig.width = '100%';
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.disableClose = true;
    const dialogRef = this.dialogRef.open(SelectCustomerComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => {
        this.customer = res;
        this.setData();
      });
  }

}
