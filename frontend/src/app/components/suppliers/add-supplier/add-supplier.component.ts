import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: []
})
export class AddSupplierComponent implements OnInit {

  constructor( 
    private supplierService: SuppliersService,
    private dialogRef: MatDialogRef<AddSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }


  supplier: any;
  supplierForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    fantasyName: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });


  ngOnInit(): void {
    if (this.data.edit) {
      this.supplierService.getOne(this.data.supplierID)
        .subscribe(
          res => {
            this.supplier = res;
            this.setData();
          })
    }
  }

  setData(){
    this.supplierForm.patchValue({
      businessName: this.supplier.razonSocial,
      fantasyName: this.supplier.nombreFantasia,
      telephone: this.supplier.telefono,
      address: this.supplier.domicilio,
      email: this.supplier.email
    })
  }

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    if (this.data.edit){
      this.supplierService.editSupplier(this.data.supplierID, this.supplierForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    }else {
      this.supplierService.addSupplier(this.supplierForm.value)
        .subscribe(
          res => this.dialogRef.close(),
          err => alert("Verifique los datos ingresados")
        )
    }
  }

}
