import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCustomerComponent } from '../../customers/select-customer/select-customer.component';
import { SelectPrescriptionsComponent } from './../../prescriptions/select-prescriptions/select-prescriptions.component';
import { SelectFrameComponent } from './../../frames/select-frame/select-frame.component';
import { SelectLensStockComponent } from './../../lenses/select-lens-stock/select-lens-stock.component';
import { Observable } from 'rxjs';
import { CustomerHealthCareService } from './../../../services/customerHealthCare/customer-health-care.service';
import { GlassesService } from './../../../services/glasses/glasses.service';
import * as moment from 'moment';
import { SupportingDocumentComponent } from './../supporting-document/supporting-document.component';


@Component({
  selector: 'app-add-glasses',
  templateUrl: './add-glasses.component.html',
  styles: [
  ]
})
export class AddGlassesComponent implements OnInit {

  constructor(
    private customerHealthCareService: CustomerHealthCareService,
    private glassesService: GlassesService,
    private dialogRef: MatDialog,
    @Inject (MAT_DIALOG_DATA) public data,
    private dialogRefAdd: MatDialogRef<AddGlassesComponent>
  ) {  }


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
    prescriptionNumber: new FormControl('', Validators.required),
    descriptionLeftLens: new FormControl('', Validators.required),
    leftLensID: new FormControl(null, Validators.required),
    descriptionRightLens: new FormControl('', Validators.required),
    rightLensID: new FormControl(null, Validators.required),
    nearValueDIP: new FormControl('', Validators.required),
    addValue: new FormControl('', Validators.required),
    farValueDIP: new FormControl('', Validators.required),
    heightValue: new FormControl('', Validators.required),
    glassesUtility: new FormControl('', Validators.required),
    frameDescription: new FormControl('', Validators.required),
    frameID: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),
    expectedDeliveryDate: new FormControl('', Validators.required),
    deliveryDate: new FormControl('', Validators.required),
    glassesStatus: new FormControl('Pendiente', Validators.required),
    payRemainder: new FormControl(false, Validators.required),
    tokenPayment: new FormControl('', Validators.required),
    amountRemainder: new FormControl('', Validators.required),
    receiptHealthCare: new FormControl(false, Validators.required),
    healthCareID: new FormControl('', Validators.required)
  })
  customer: any;
  prescription: any;
  frame: any;
  lensLE: any;
  lensRE: any;
  lensLoaded: string;
  dialogConfig = new MatDialogConfig();
  glassesUtilities: string[] = ['Lejos', 'Cerca', 'Ambos']; 
  healthCares$: Observable<any[]>;
  glasses: any;
  statusArray: any[] = ['Pendiente', 'En Taller', 'Entregado'];
  today = moment().format('DD/MM/yyyy');

  ngOnInit(): void {
    if(this.data.edit){
      this.getOne();
    };
    this.dialogConfig.height = '100%';
    this.dialogConfig.width = '100%';
  }

  onSubmit(){
    this.dialogConfig.disableClose = false;
    if(this.data.edit){
      this.glassesService.editGlasses(this.data.glassesNumber, this.glassesForm.value)
      .subscribe(
        res => {
          this.dialogRefAdd.close();
          this.dialogConfig.data = {
            glassesNumber: this.glasses.numAnteojo
          };
          const dialogRef = this.dialogRef.open(SupportingDocumentComponent, this.dialogConfig);
        },
        err => alert(err.error.msg)
      );
    } else {
      this.glassesService.addGlasses(this.glassesForm.value)
      .subscribe(
        res => {
          this.dialogRefAdd.close();
          this.dialogConfig.data = {
            glassesNumber: res
          };
          const dialogRef = this.dialogRef.open(SupportingDocumentComponent, this.dialogConfig);
        },
        err => alert(err.error.msg)
      );
    }
  }

  getOne(){
    this.glassesService.getOne(this.data.glassesNumber)
      .subscribe(res => {
        this.glasses = res;
        this.setGlassesData();
      });
  }

  convertDate(date){
    if(date){
      const arrayConverted = date.split('T', date.length);
      return arrayConverted[0];
    }
  }

  setGlassesData(){
    this.healthCares$ = this.customerHealthCareService.getAllByCustomer(this.glasses.recetum.cliente.idCliente);
    this.glassesForm.patchValue({
        nameAndSurname: this.glasses.recetum.cliente.nombre + ' ' + this.glasses.recetum.cliente.apellido,
        telephone: this.glasses.recetum.cliente.telefono,
        address: this.glasses.recetum.cliente.domicilio,
        sphericalValueLE: this.glasses.recetum.valorEsfOI, 
        sphericalValueRE: this.glasses.recetum.valorEsfOD,
        cylindricalValueLE: this.glasses.recetum.valorCilOI,
        cylindricalValueRE: this.glasses.recetum.valorCilOD,
        axisLE: this.glasses.recetum.ejeOI,
        axisRE: this.glasses.recetum.ejeOD,
        prescriptionNumber: this.glasses.recetum.numReceta,
        nearValueDIP: this.glasses.recetum.valorDIPCerca,
        addValue: this.glasses.recetum.valorADD,
        farValueDIP: this.glasses.recetum.valorDIPLejos,
        heightValue: this.glasses.valorAltura,
        deliveryDate: this.convertDate(this.glasses.fechaEntrega),
        payRemainder: this.glasses.abonoSaldo,
        glassesUtility: this.glasses.utilidadAnteojo,
        glassesStatus: this.glasses.estadoAnteojo,
        frameDescription: this.glasses.armazon.marca + ' - ' + this.glasses.armazon.modelo,
        frameID: this.glasses.armazon.codArmazon,
        totalAmount: this.glasses.montoTotal,
        expectedDeliveryDate: this.convertDate(this.glasses.fechaPrometido),
        tokenPayment: this.glasses.montoSena,
        amountRemainder: this.glasses.montoTotal - this.glasses.montoSena,
        receiptHealthCare: this.glasses.esFacObraSocial
    })
    if(this.glasses.esFacObraSocial){
      this.glassesForm.patchValue({
        healthCareID: this.glasses.obra_social.idObraSocial
      });
    } else {
      this.glassesForm.patchValue({
        healthCareID: ''
      });
    }
    if(this.glasses.codLenteOD === null){
      this.glassesForm.patchValue({
        descriptionRightLens: '',
        rightLensID: null
      });
    } else {
      this.glassesForm.patchValue({
        descriptionRightLens: this.glasses.codLenteOD.toString().padStart(6, 0),
        rightLensID: this.glasses.codLenteOD
      });
    };
    if(this.glasses.codLenteOI === null){
      this.glassesForm.patchValue({
        descriptionLeftLens: '',
        leftLensID: null
      });
    } else {
      this.glassesForm.patchValue({
        descriptionLeftLens: this.glasses.codLenteOI.toString().padStart(6, 0),
        leftLensID: this.glasses.codLenteOI
      });  
    };
  }

  setCustomerData(){
    this.healthCares$ = this.customerHealthCareService.getAllByCustomer(this.customer.idCliente);
    this.glassesForm.patchValue({
      nameAndSurname: this.customer.nombre + ' ' + this.customer.apellido,
      telephone: this.customer.telefono,
      address: this.customer.domicilio
    });
    this.deletePrescriptionData();
  }

  deletePrescriptionData(){
    this.glassesForm.patchValue({
      sphericalValueLE: '', 
      sphericalValueRE: '',
      cylindricalValueLE: '',
      cylindricalValueRE: '',
      axisLE: '',
      axisRE: '',
      prescriptionNumber: '',
      nearValueDIP: ''
    });
  }

  calculateAmountRemainder(event){
    const totalAmount = this.glassesForm.get('totalAmount').value;
    const tokenPayment = this.glassesForm.get('tokenPayment').value;
    this.glassesForm.patchValue({
      amountRemainder: totalAmount - tokenPayment
    })
    if(totalAmount){
      this.glassesForm.patchValue({
        amountRemainder: totalAmount - tokenPayment
      })
    }    
  }

  setPrescriptionData(){
    this.glassesForm.patchValue({
      prescriptionNumber: this.prescription.numReceta,
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
      frameID: this.frame.codArmazon
    })
  }

  setLensData(){
    switch(this.lensLoaded){
      case 'Left': {
        this.glassesForm.patchValue({
          leftLensID: this.lensLE.codLente,
          descriptionLeftLens: this.lensLE.codLente.toString().padStart(6,0)
        });
        break; 
      }
      case 'Right': {
        this.glassesForm.patchValue({
          rightLensID: this.lensRE.codLente,
          descriptionRightLens: this.lensRE.codLente.toString().padStart(6,0)
        });
        break; 
      }
    }
  }

  searchLensFromOrderRE(){
    this.lensLoaded = 'Right';
    const dialogRef = this.dialogRef.open(SelectLensStockComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(
        res => {
          this.lensRE = res;
          if(res){
            this.setLensData();
          }
        })
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
        })
  }

  deleteLoadedLensLE(){
    this.glassesForm.patchValue({
      leftLensID: null,
      descriptionLeftLens: ''
    })
  }

  deleteLoadedLensRE(){
    this.glassesForm.patchValue({
      rightLensID: null,
      descriptionRightLens: ''
    })
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

  
}
