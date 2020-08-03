import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-data',
  templateUrl: './supplier-data.component.html',
  styleUrls: ['./supplier-data.component.css']
})
export class SupplierDataComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SupplierDataComponent>,
    @Inject(MAT_DIALOG_DATA) public client
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
