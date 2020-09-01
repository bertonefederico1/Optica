import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuppliersService } from './../../../services/suppliers/suppliers.service';

@Component({
  selector: 'app-supplier-data',
  templateUrl: './supplier-data.component.html',
  styleUrls: []
})
export class SupplierDataComponent implements OnInit {

  constructor(
    private suppliersService: SuppliersService,
    private dialogRef: MatDialogRef<SupplierDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  supplier: any;

  ngOnInit(): void {
    this.suppliersService.getOne(this.data.supplierID)
      .subscribe(
        res => this.supplier = res
      )
  }

  close(){
    this.dialogRef.close();
  }
}
