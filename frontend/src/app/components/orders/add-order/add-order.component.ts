import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LensesService } from './../../../services/lenses/lenses.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectCustomerComponent } from './../../customers/select-customer/select-customer.component';
import { SelectSupplierComponent } from './../../suppliers/select-supplier/select-supplier.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styles: [
  ]
})
export class AddOrderComponent implements OnInit {

  constructor(
    private lensService: LensesService,
    private dialogRef: MatDialog
  ) { }

  lensDesigns$: Observable<any[]>;
  lensMaterials$: Observable<any[]>;
  lensFinishes$: Observable<any[]>;
  customer: any = '';
  supplierLaboratory: any;
  dialogConfig = new MatDialogConfig();

  orderForm = new FormGroup({
    nameAndSurname: new FormControl({value: '', disabled: true}, Validators.required),
    telephone: new FormControl({value: '', disabled: true}, Validators.required),
    address: new FormControl({value: '', disabled: true}, Validators.required),
    supplierLaboratory: new FormControl({value: '', disabled: true}, Validators.required),
    currentDate: new FormControl({value: '', disabled: true}, Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
    prescriptionObs: new FormControl('', Validators.required),
    orderLensLE: new FormControl(true, Validators.required),
    orderLensRE: new FormControl(true, Validators.required),
    sphericalValueLE: new FormControl('', Validators.required),
    sphericalValueRE: new FormControl('', Validators.required),
    cilyndricalValueLE: new FormControl('', Validators.required),
    cilyndricalValueRE: new FormControl('', Validators.required),
    axisLE: new FormControl('', Validators.required),
    axisRE: new FormControl('', Validators.required),
    refractionIndexLE: new FormControl('', Validators.required),
    refractionIndexRE: new FormControl('', Validators.required),
    lensColor: new FormControl('', Validators.required),
    lensDesign: new FormControl('', Validators.required),
    lensMaterial: new FormControl('', Validators.required),
    lensDiameter: new FormControl('', Validators.required),
    finishLens: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.lensDesigns$ = this.lensService.getLensDesigns();
    this.lensFinishes$ = this.lensService.getLensFinishes();
    this.lensMaterials$ = this.lensService.getLensMaterials();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
  }

  setCustomerData(){
    this.orderForm.patchValue({
      nameAndSurname: this.customer.nombre + ' ' + this.customer.apellido,
      telephone: this.customer.telefono,
      address: this.customer.domicilio
    })
  }

  setSupplierData(){
    this.orderForm.patchValue({
      supplierLaboratory: this.supplierLaboratory.nombreFantasia
    })
  }

  searchCustomer(){
    const dialogRef = this.dialogRef.open(SelectCustomerComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => {
        if(res){
          this.customer = res;
          this.setCustomerData();
        }
      });
  }

  searchSupplierLaboratory(){
    const dialogRef = this.dialogRef.open(SelectSupplierComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => {
        this.supplierLaboratory = res;
        this.setSupplierData();
      })
  }

}
