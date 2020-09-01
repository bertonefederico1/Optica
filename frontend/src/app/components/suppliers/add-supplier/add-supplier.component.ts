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

  ngOnInit(): void {
  }

  supplierForm = new FormGroup({
    businessName: new FormControl('', Validators.required),
    fantasyName: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  cancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    if (this.data.edit){
      
    }else {
      this.supplierService.addSupplier(this.supplierForm.value)
        .subscribe(res => {
          this.dialogRef.close();
        },
        err => alert("Verifique los datos ingresados"))
    }
  }

}
