import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FramesService } from './../../../services/frames/frames.service';
import { Observable } from 'rxjs';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';
import { setClassMetadata } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-add-frame',
  templateUrl: './add-frame.component.html',
  styleUrls: []
})
export class AddFrameComponent implements OnInit {

  constructor(
    private frameService: FramesService,
    private supplierService: SuppliersService,
    private dialogRef: MatDialogRef<AddFrameComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  frameForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    supplierLaboratory: new FormControl('', Validators.required),
    quantityInStock: new FormControl('', Validators.required),
    design: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    utility: new FormControl('', Validators.required)
  });

  frameMaterials$: Observable<any[]>;
  frameDesigns$: Observable<any[]>;
  frameUtilities$: Observable<any[]>;
  suppliersLaboratories$: Observable<any[]>;
  frame: any;

  ngOnInit(): void {
    this.frameDesigns$ = this.frameService.getFramesDesigns();
    this.frameMaterials$ = this.frameService.getFrameMaterials();
    this.frameUtilities$ = this.frameService.getFramesUtilities();
    this.suppliersLaboratories$ = this.supplierService.getAll();
    if(this.data.edit){
      this.frameService.getOne(this.data.frameID)
        .subscribe(
          res => {
            this.frame = res;
            this.setData();
          }
        )
    }
  }

  setData(){
    this.frameForm.patchValue({
      brand: this.frame.marca,
      model: this.frame.modelo,
      color: this.frame.color,
      supplierLaboratory: this.frame.idProvLab,
      quantityInStock: this.frame.cantidad,
      design: this.frame.idDisenoArmazon,
      material: this.frame.idMaterialArmazon,
      utility:  this.frame.idUtilidadArmazon 
    })
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    if (this.data.edit) {
      this.frameService.editFrame(this.data.frameID, this.frameForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    } else {
      this.frameService.addFrame(this.frameForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    }
  }

}
