import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LensesService } from './../../../services/lenses/lenses.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectSupplierComponent } from './../../suppliers/select-supplier/select-supplier.component';
import { SelectPrescriptionsComponent } from './../../prescriptions/select-prescriptions/select-prescriptions.component';
import * as moment from 'moment'
import { OrdersService } from './../../../services/orders/orders.service';
import { SelectGlassesPendingComponent } from './../../glasses/select-glasses-pending/select-glasses-pending.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styles: [
  ]
})
export class AddOrderComponent implements OnInit {

  constructor(
    private lensService: LensesService,
    private orderService: OrdersService,
    private dialogRef: MatDialog,
    private dialogRefAdd: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  lensDesigns$: Observable<any[]>;
  lensMaterials$: Observable<any[]>;
  lensFinishes$: Observable<any[]>;
  glasses: any;
  supplierLaboratory: any;
  prescription: any;
  dialogConfig = new MatDialogConfig();
  currentDate = new Date();
  today = moment().format('DD/MM/yyyy');


  orderForm = new FormGroup({
    nameAndSurname: new FormControl('', Validators.required),
    glassesNumber: new FormControl('', Validators.required),
    glassesNumberDescription: new FormControl('', Validators.required),
    supplierLaboratoryBusinessName: new FormControl('', Validators.required),
    supplierLaboratoryID: new FormControl('', Validators.required),
    currentDate: new FormControl(this.today, Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
    orderObs: new FormControl('', Validators.required),
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
    lensFinish: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.lensDesigns$ = this.lensService.getLensDesigns();
    this.lensFinishes$ = this.lensService.getLensFinishes();
    this.lensMaterials$ = this.lensService.getLensMaterials();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
  }

  setDataGlassesPending(){
    this.orderForm.patchValue({
      nameAndSurname: this.glasses.recetum.cliente.nombre + ' ' + this.glasses.recetum.cliente.apellido,
      glassesNumberDescription: this.glasses.numAnteojo.toString().padStart(7, 0),
      glassesNumber: this.glasses.numAnteojo
    });
  }

  setSupplierData(){
    this.orderForm.patchValue({
      supplierLaboratoryBusinessName: this.supplierLaboratory.nombreFantasia,
      supplierLaboratoryID: this.supplierLaboratory.idProvLab
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

  searchGlassesPending(){
    const dialogRef = this.dialogRef.open(SelectGlassesPendingComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => {
        if(res){
          this.glasses = res;
          this.setDataGlassesPending();
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
    if(this.glasses) {
      this.dialogConfig.data = {
        glassesNumber: this.glasses.numAnteojo,
        type: 'newOrder'
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
      alert("Primero debe seleccionar un anteojo");
    }
  }

  onSubmit(){
      if(this.data.edit){
        
      } else {
        console.log(this.orderForm.value)
        this.orderService.addOrder(this.orderForm.value)
          .subscribe(
        res => console.log(res),
        err => alert(err.error.msg)
        );
      }
  }

}
