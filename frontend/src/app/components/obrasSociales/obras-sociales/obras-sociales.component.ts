import { Component, OnInit, ViewChild } from '@angular/core';
import { ObrasSocialesService } from './../../../services/obrasSociales/obras-sociales.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddObraSocialComponent } from './../add-obra-social/add-obra-social.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-obras-sociales',
  templateUrl: './obras-sociales.component.html',
  styleUrls: ['./obras-sociales.component.css']
})
export class ObrasSocialesComponent implements OnInit {

  constructor(
    private obrasSocialesService: ObrasSocialesService,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  edit: boolean;
  displayedColumns: string[] = ['codigo', 'nombre', 'periodoFacturacion', 'cantidadAnteojosPorPeriodo', 'acciones'];
  dataSource = null;

  editObraSocial(id: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddObraSocialComponent, {
      height: '60vh',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
    dialogRef.afterClosed()
      .subscribe(
        res=> console.log("OS EDITADA")
      )
  }

  addObraSocial(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddObraSocialComponent, {
      height: '60vw',
      width: '70vw',
      disableClose: true,
      data: this.edit
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.getAll();
        console.log("OS AGREGADA");
      })
  }

  getAll(){
    this.obrasSocialesService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )
  }

  applyFilter(filterValue: string){ 
    this.dataSource.filter = filterValue; 
  }

}
