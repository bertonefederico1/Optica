import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LensesService } from './../../../services/lenses/lenses.service';
import { Observable } from 'rxjs';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';

@Component({
  selector: 'app-add-lens',
  templateUrl: './add-lens.component.html',
  styleUrls: []
})
export class AddLensComponent implements OnInit {

  constructor(
    private lensService: LensesService,
    private supplierService: SuppliersService,
    private dialogRef: MatDialogRef<AddLensComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  lensMaterials$: Observable<any[]>;
  lensDesigns$: Observable<any[]>;
  lensFinishes$: Observable<any[]>;
  suppliersLaboratories$: Observable<any[]>;
  lens: any;

  lensForm = new FormGroup({
    sphericalValue: new FormControl('', Validators.required),
    cilyndricalValue: new FormControl('', Validators.required),
    refractiveIndex: new FormControl('', Validators.required),
    axis: new FormControl('', Validators.required),
    diameter: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    quantityInStock: new FormControl('', Validators.required),
    design: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    finish: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required)
  });

  ngOnInit(){
    this.lensDesigns$ = this.lensService.getLensDesigns();
    this.lensMaterials$ = this.lensService.getLensMaterials();
    this.lensFinishes$ = this.lensService.getLensFinishes();
    this.suppliersLaboratories$ = this.supplierService.getAll();
    if (this.data.edit){
      this.lensService.getOne(this.data.lensID)
        .subscribe(res => {
          this.lens = res; 
          this.setData();
        })
    }
  }

  setData(){
    this.lensForm.patchValue({
      sphericalValue: this.lens.valorEsf,
      cilyndricalValue: this.lens.valorCil,
      refractiveIndex: this.lens.indiceRefraccion,
      axis: this.lens.eje,
      diameter: this.lens.diametro,
      color: this.lens.color,
      quantityInStock: this.lens.cantidad,
      design: this.lens.idDisenoLente,
      material: this.lens.idMaterialLente,
      finish: this.lens.idAcabadoLente,
      supplier: this.lens.idProvLab
    })
  }  

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.data.edit){
      this.lensService.editLens(this.data.lensID, this.lensForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    } else{
      this.lensService.addLens(this.lensForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    }
  }

}
