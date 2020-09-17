import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SelectCustomerComponent } from '../../customers/select-customer/select-customer.component';
import { SelectPrescriptionsComponent } from './../../prescriptions/select-prescriptions/select-prescriptions.component';
import { SelectFrameComponent } from './../../frames/select-frame/select-frame.component';
import { SelectLensStockComponent } from './../../lenses/select-lens-stock/select-lens-stock.component';

@Component({
  selector: 'app-add-glasses',
  templateUrl: './add-glasses.component.html',
  styles: [
  ]
})
export class AddGlassesComponent implements OnInit {

  constructor(
    private dialogRef: MatDialog,
    private dialogRefAdd: MatDialogRef<AddGlassesComponent>
  ) { }


  glassesForm = new FormGroup({
    nameAndSurname: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    sphericalValueLE: new FormControl('', Validators.required), 
    sphericalValueRE: new FormControl('', Validators.required),
    cylindricalValueLE: new FormControl('', Validators.required),
    cylindricalValueRE: new FormControl('', Validators.required),
    axisLE: new FormControl('', Validators.required),
    axisRE: new FormControl('', Validators.required),
    prescriptionID: new FormControl('', Validators.required),
    descriptionLeftLens: new FormControl('', Validators.required),
    leftLensID: new FormControl('', Validators.required),
    descriptionRightLens: new FormControl('', Validators.required),
    rightLensID: new FormControl('', Validators.required),
    nearValueDIP: new FormControl('', Validators.required),
    addValue: new FormControl('', Validators.required),
    farValueDIP: new FormControl('', Validators.required),
    heightValue: new FormControl('', Validators.required),
    lensUtility: new FormControl('', Validators.required),
    frameDescription: new FormControl('', Validators.required),
    frameID: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
    tokenPayment: new FormControl('', Validators.required),
    amountRemainder: new FormControl('', Validators.required),
    receiptHealthCare: new FormControl('', Validators.required)
  })
  customer: any;
  prescription: any;
  frame: any;
  lensLE: any;
  lensRE: any;
  lensLoaded: string;
  dialogConfig = new MatDialogConfig();
  glassesUtilities: string[] = ['Lejos', 'Cerca', 'Ambos'];

  ngOnInit(): void {
    this.dialogConfig.height = '100%';
    this.dialogConfig.width = '100%';
  }

  setCustomerData(){
    this.glassesForm.patchValue({
      nameAndSurname: this.customer.nombre + ' ' + this.customer.apellido,
      telephone: this.customer.telefono,
      address: this.customer.domicilio
    })
  }

  setPrescriptionData(){
    this.glassesForm.patchValue({
      prescriptionID: this.prescription.numReceta,
      sphericalValueLE: this.prescription.valorEsfOI, 
      sphericalValueRE: this.prescription.valorEsfOD,
      cylindricalValueLE: this.prescription.valorCilOI,
      cylindricalValueRE: this.prescription.valorCilOD,
      axisLE: this.prescription.ejeOI,
      axisRE: this.prescription.ejeOD,
      nearValueDIP: this.prescription.valorDIPCerca,
      farValueDIP: this.prescription.valorDIPLejos,
      addValue: this.prescription.valorADD
    })
  }

  setFrameData(){
    this.glassesForm.patchValue({
      frameDescription: this.frame.marca + ' - ' + this.frame.modelo,
      frameID: this.frame.idArmazon
    })
  }

  setLensData(){
    switch(this.lensLoaded){
      case 'Left': {
        this.glassesForm.patchValue({
          leftLensID: this.lensLE.codLente,
          descriptionLeftLens: this.lensLE.codLente.toString().padStart(6,0)
        })
      }
      case 'Right': {
        
      }
    }
  }

  searchCustomer(){
    const dialogRef = this.dialogRef.open(SelectCustomerComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(
        res => {
          this.customer = res;
          if(res){
            this.setCustomerData();
          }
        } 
      )
  }

  searchPrescription(){
    if(this.customer){
      this.dialogConfig.data = {
        customer: this.customer
      }
      const dialogRef = this.dialogRef.open(SelectPrescriptionsComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(
          res => {
            this.prescription = res;
            if(res){
              this.setPrescriptionData();
            }
          }
        )
    } else {
      alert("Primero debe seleccionar un cliente");
    }
  }

  searchFrame(){
    const dialogRef = this.dialogRef.open(SelectFrameComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(
        res => {
          this.frame = res;
          if(res){
            this.setFrameData();
          }
        }
      )
  }

  searchLensFromOrder(){
    
  }

  searchLensFromStockLE(){
    this.lensLoaded = 'Left';
    const dialogRef = this.dialogRef.open(SelectLensStockComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(
        res => {
          this.lensLE = res;
          if(res){
            this.setLensData();
          }
        }
      )
  }

  searchLensFromStockRE(){
    this.lensLoaded = "Right";
  }

  onSubmit(){
    console.log("Save Glasses");
  }

  
}
