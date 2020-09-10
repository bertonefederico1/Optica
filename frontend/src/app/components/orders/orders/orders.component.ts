import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../../services/orders/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderComponent } from './../add-order/add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  constructor(
    private orderService: OrdersService,
    private dialogRef: MatDialog
  ) { }

  displayedColumns: string[] = ['orderNumber', 'nameAndSurname', 'prescriptionNumber', 'expectedDeliveryDate', 'Laboratory', 'actions'];
  dataSource = null;
  dialogConfig = new MatDialogConfig();

  ngOnInit(): void {
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.getAll();
  }

  getAll(){
    this.orderService.getAll()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
      })
  }

  addOrder(){
    this.dialogRef.open(AddOrderComponent, this.dialogConfig)
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
