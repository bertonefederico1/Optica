import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from './../../../services/orders/orders.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styles: []
})
export class OrderDataComponent implements OnInit {

  constructor(
    private orderService: OrdersService,
    private dialogRef: MatDialogRef<OrderDataComponent>,
    @Inject (MAT_DIALOG_DATA) public data
  ) { }

  order: any;

  ngOnInit(): void {
    this.getOne(this.data.orderNumber);
  }

  getOne(orderNumber: number){
    this.orderService.getOne(orderNumber)
      .subscribe(res => this.order = res);
  }

}
