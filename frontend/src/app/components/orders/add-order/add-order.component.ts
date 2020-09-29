import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LensesService } from './../../../services/lenses/lenses.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectSupplierComponent } from './../../suppliers/select-supplier/select-supplier.component';
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
  order: any;
  today = moment().format('DD/MM/yyyy');
  statusArray = ['Pendiente', 'Recibido'];


  orderForm = new FormGroup({
    nameAndSurname: new FormControl('', Validators.required),
    glassesNumber: new FormControl('', Validators.required),
    glassesNumberDescription: new FormControl('', Validators.required),
    supplierLaboratoryFantasyName: new FormControl('', Validators.required),
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
    lensFinish: new FormControl('', Validators.required),
    orderStatus: new FormControl('')
  })

  ngOnInit(): void {
    this.lensDesigns$ = this.lensService.getLensDesigns();
    this.lensFinishes$ = this.lensService.getLensFinishes();
    this.lensMaterials$ = this.lensService.getLensMaterials();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    if(this.data.edit){
      this.getOne(this.data.orderNumber)
    };
  }

  onSubmit(){
    if(this.data.edit){
      this.orderService.editOrder(this.data.orderNumber, this.orderForm.value)
        .subscribe(
          res => this.dialogRefAdd.close(),
          err => alert(err.error.msg)
        );
    } else {
      this.orderService.addOrder(this.orderForm.value)
        .subscribe(
          res => this.dialogRefAdd.close(),
          err => alert(err.error.msg)
        );
    }
}

  getOne(orderNumber: number){
    this.orderService.getOne(orderNumber)
      .subscribe(res => {
        this.order = res;
        this.setDataOrder()
      });
  }

  setDataOrder(){
    this.orderForm.patchValue({
      nameAndSurname: this.order.anteojo_recetum.recetum.cliente.nombre + ' ' + this.order.anteojo_recetum.recetum.cliente.apellido,
      glassesNumber: this.order.anteojo_recetum.numAnteojo,
      glassesNumberDescription: this.order.anteojo_recetum.numAnteojo.toString().padStart(7,0),
      supplierLaboratoryFantasyName: this.order.proveedor_laboratorio.nombreFantasia,
      supplierLaboratoryID: this.order.proveedor_laboratorio.idProvLab,
      currentDate: this.today,
      expectedDeliveryDate: this.order.fechaEntregaEsperada,
      orderObs: this.order.obsPedido,
      orderLensLE: this.order.pedirLenteOI,
      orderLensRE: this.order.pedirLenteOD,
      sphericalValueLE: this.order.anteojo_recetum.recetum.valorEsfOI,
      sphericalValueRE: this.order.anteojo_recetum.recetum.valorEsfOD,
      cilyndricalValueLE: this.order.anteojo_recetum.recetum.valorCilOI,
      cilyndricalValueRE: this.order.anteojo_recetum.recetum.valorCilOD,
      axisLE: this.order.anteojo_recetum.recetum.ejeOI,
      axisRE: this.order.anteojo_recetum.recetum.ejeOD,
      orderStatus: this.order.estadoPedido
    })
    if(this.order.LensOI){
      this.orderForm.patchValue({
        refractionIndexLE: this.order.LensOI.indiceRefraccion,
        lensColor: this.order.LensOI.color,
        lensDiameter: this.order.LensOI.diametro,
        lensDesign: this.order.LensOI.idDisenoLente,
        lensMaterial: this.order.LensOI.idMaterialLente,
        lensFinish: this.order.LensOI.idAcabadoLente
      });
    };
    if(this.order.LensOD){
      this.orderForm.patchValue({
        refractionIndexRE: this.order.LensOD.indiceRefraccion,
        lensColor: this.order.LensOD.color,
        lensDiameter: this.order.LensOD.diametro,
        lensDesign: this.order.LensOD.idDisenoLente,
        lensMaterial: this.order.LensOD.idMaterialLente,
        lensFinish: this.order.LensOD.idAcabadoLente
      })
    };
  }

  setGlassesDataPending(){
    this.orderForm.patchValue({
      nameAndSurname: this.glasses.recetum.cliente.nombre + ' ' + this.glasses.recetum.cliente.apellido,
      glassesNumberDescription: this.glasses.numAnteojo.toString().padStart(7, 0),
      glassesNumber: this.glasses.numAnteojo
    });
    this.deletePrescriptionData();
  }

  setSupplierData(){
    this.orderForm.patchValue({
      supplierLaboratoryFantasyName: this.supplierLaboratory.nombreFantasia,
      supplierLaboratoryID: this.supplierLaboratory.idProvLab
    });
  }

  deletePrescriptionData(){
    this.orderForm.patchValue({
      sphericalValueLE: '',
      sphericalValueRE: '',
      cilyndricalValueLE: '',
      cilyndricalValueRE: '',
      axisLE: '',
      axisRE: ''
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
          this.prescription = res.recetum;
          this.setGlassesDataPending();
          this.setPrescriptionData();
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

  /* searchPrescription(){
    if(this.orderForm.get('glassesNumber').value) {
      this.dialogConfig.data = {
        glassesNumber: this.orderForm.get('glassesNumber').value,
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
  } */

}
