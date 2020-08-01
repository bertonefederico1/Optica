import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css']
})
export class ClientDataComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ClientDataComponent>,
    @Inject(MAT_DIALOG_DATA) public client
  ) { }

  ngOnInit(): void {
  }

  exit(){
    this.dialogRef.close();
  }

}
