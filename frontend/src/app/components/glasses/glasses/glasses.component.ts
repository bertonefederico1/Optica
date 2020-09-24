import { Component, OnInit } from '@angular/core';
import { GlassesService } from './../../../services/glasses/glasses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddGlassesComponent } from './../add-glasses/add-glasses.component';
import { DataGlassesComponent } from './../data-glasses/data-glasses.component';
import { SupportingDocumentComponent } from '../supporting-document/supporting-document.component';

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
  statusArray: string[] = ['Todos', 'Pendiente', 'En taller', 'Entregado'];
  edit: boolean;
  glasses: any;

  ngOnInit(): void {
    this.getAll();
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.disableClose = true;
  }

  filter(){
    this.filterSelect === 'Todos' ? this.dataSource.filter = '' : this.dataSource.filter = this.filterSelect;
  }

  getAll(){
    this.glassesService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        })
  }

  printerSupportingDocument(glassesNumber: number){
    this.dialogConfig.data = {
      glassesNumber: glassesNumber
    };
    this.dialogRef.open(SupportingDocumentComponent, this.dialogConfig);
  }

  dataGlasses(glassesNumber: number){
    this.dialogConfig.data = {
      glassesNumber: glassesNumber
    };
    this.dialogConfig.disableClose = false;
    const dialogRef = this.dialogRef.open(DataGlassesComponent, this.dialogConfig);
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

  editGlasses(glassesNumber: number){
    this.edit = true;
    this.dialogConfig.data = {
      edit: this.edit,
      glassesNumber: glassesNumber
    };
    const dialogRef = this.dialogRef.open(AddGlassesComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(res => this.getAll());
  }

  deleteGlasses(glassesNumber: number){
    if(confirm("¿Seguro que desea eliminar el anteojo?")){
      this.glassesService.deleteGlasses(glassesNumber)
      .subscribe(res => this.getAll());
    };
  }

  setupFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data.recetum.cliente.nombre.toLowerCase() + ' ' + data.recetum.cliente.apellido.toLowerCase();
      return textToSearch.indexOf(filter) != -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
