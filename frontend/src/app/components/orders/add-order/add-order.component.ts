import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LensesService } from './../../../services/lenses/lenses.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectCustomerComponent } from './../../customers/select-customer/select-customer.component';
import { SelectSupplierComponent } from './../../suppliers/select-supplier/select-supplier.component';
import { SelectPrescriptionsComponent } from './../../prescriptions/select-prescriptions/select-prescriptions.component';
import * as moment from 'moment'

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
  prescription: any;
  dialogConfig = new MatDialogConfig();
  currentDate = new Date();
  today = moment().format('DD/MM/yyyy');


  orderForm = new FormGroup({
    nameAndSurname: new FormControl({value: '', disabled: true}, Validators.required),
    telephone: new FormControl({value: '', disabled: true}, Validators.required),
    address: new FormControl({value: '', disabled: true}, Validators.required),
    supplierLaboratory: new FormControl({value: '', disabled: true}, Validators.required),
    currentDate: new FormControl({value: this.today, disabled: true}, Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
    orderObs: new FormControl('', Validators.required),
    orderLensLE: new FormControl(true, Validators.required),
    orderLensRE: new FormControl(true, Validators.required),
    sphericalValueLE: new FormControl({value: '', disabled: true}, Validators.required),
    sphericalValueRE: new FormControl({value: '', disabled: true}, Validators.required),
    cilyndricalValueLE: new FormControl({value: '', disabled: true}, Validators.required),
    cilyndricalValueRE: new FormControl({value: '', disabled: true}, Validators.required),
    axisLE: new FormControl({value: '', disabled: true}, Validators.required),
    axisRE: new FormControl({value: '', disabled: true}, Validators.required),
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

  setPrescriptionData(){
    this.orderForm.patchValue({
      sphericalValueLE: this.prescription.valorEsfOI,
      sphericalValueRE: this.prescription.valorEsfOD,
      cilyndricalValueLE: this.prescription.valorCilOI,
      cilyndricalValueRE: this.prescription.valorCilOD,
      axisLE: this.prescription.ejeOI,
      axisRE: this.prescription.ejeOD
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
        if(res){
          this.supplierLaboratory = res;
          this.setSupplierData();
        }
      })
  }

  searchPrescription(){
    if(this.customer !== '') {
      this.dialogConfig.data = {
        customer: this.customer
      };
      const dialogRef = this.dialogRef.open(SelectPrescriptionsComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(res => {
          if(res){
            this.prescription = res;
            this.setPrescriptionData();
          }
        })
    } else {
      alert("Primero debe seleccionar un cliente");
    }
    
  }

  onSubmit(){
    console.log(this.orderForm.value);
  }

}
