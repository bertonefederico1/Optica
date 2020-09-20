import { Component, OnInit } from '@angular/core';
import { GlassesService } from './../../../services/glasses/glasses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddGlassesComponent } from './../add-glasses/add-glasses.component';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styles: [
  ]
})
export class GlassesComponent implements OnInit {

  constructor(
    private glassesService: GlassesService,
    private dialogRef: MatDialog
  ) { }

  displayedColumns: string[] = ['nameAndSurname', 'prescriptionNumber', 'expectedDeliveryDate', 'remainingAmount', 'status', 'actions'];
  dataSource = null;
  dialogConfig = new MatDialogConfig();
  filterSelect: string = 'Todos';
  statements: string[] = ['Pendiente', 'Todos', 'En taller', 'Entregado'];
  edit: boolean;

  ngOnInit(): void {
    this.getAll();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.disableClose = true;
  }

  filter(){
    this.filterSelect === 'Todos' ? this.dataSource.filter = null : this.dataSource.filter = this.filterSelect;
  }

  getAll(){
    this.glassesService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        })
  }

  addGlasses(){
    this.edit = false;
    this.dialogConfig.data = {
      edit: this.edit
    };
    const dialogRef = this.dialogRef.open(AddGlassesComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  editGlasses(glassesID: number){
    this.edit = true;
    this.dialogConfig.data = {
      edit: this.edit,
      glassesID: glassesID
    };
    const dialogRef = this.dialogRef.open(AddGlassesComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.recetum.cliente.nombre.toLowerCase() + data.recetum.cliente.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
