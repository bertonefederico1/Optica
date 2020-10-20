import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../../services/orders/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderComponent } from './../add-order/add-order.component';
import { OrderDataComponent } from './../order-data/order-data.component';
import { LoginService } from './../../../services/login/login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  constructor(
    private orderService: OrdersService,
    private dialogRef: MatDialog,
    private loginService: LoginService
  ) { }

  displayedColumns: string[] = ['orderNumber', 'nameAndSurname', 'prescriptionNumber', 'expectedDeliveryDate', 'laboratory', 'status', 'actions'];
  dataSource = null;
  dialogConfig = new MatDialogConfig();
  edit: boolean;
  filterSelect: string = 'Todos';
  statusArray: string[] = ['Todos', 'Pendiente', 'Recibido'];
  userRole: string;

  ngOnInit(): void {
    this.getUserRole();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.getAll();
  }

  getUserRole(){
    this.loginService.getUserRole()
      .subscribe(res => this.userRole = res.payload.role)
  }

  getAll(){
    this.orderService.getAll()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
      })
  }

  orderData(orderNumber: number){
    this.dialogConfig.disableClose = false;
    this.dialogConfig.data = {
      orderNumber: orderNumber
    };
    const dialogRef = this.dialogRef.open(OrderDataComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  addOrder(){
    this.edit = false;
    this.dialogConfig.disableClose = true;
    this.dialogConfig.data = {
      edit: this.edit
    }
    const dialogRef = this.dialogRef.open(AddOrderComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  editOrder(orderNumber: number){
    this.edit = true;
    this.dialogConfig.disableClose = true;
    this.dialogConfig.data = {
      edit: this.edit,
      orderNumber: orderNumber
    };
    const dialogRef = this.dialogRef.open(AddOrderComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  deleteOrder(orderNumber: number){
    if(confirm("¿Seguro que desea eliminar el pedido?")){
      this.orderService.deleteOrder(orderNumber)
      .subscribe(res => this.getAll());
    }
  }

  filter(){
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.estadoPedido;
      return textToSearch.indexOf(filter) != -1;
    };
    this.filterSelect === 'Todos' ? this.dataSource.filter = '' : this.dataSource.filter = this.filterSelect;
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.anteojo_recetum.recetum.cliente.nombre.toLowerCase() + ' ' + data.anteojo_recetum.recetum.cliente.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
