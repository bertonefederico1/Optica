import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: []
})
export class CustomerDataComponent implements OnInit {

 constructor(
    private dialogRef: MatDialogRef<CustomerDataComponent>,
    @Inject(MAT_DIALOG_DATA) public client
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
 
}
