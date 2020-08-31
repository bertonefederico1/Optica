import { Component, OnInit } from '@angular/core';
import { HealthCaresService } from '../../../services/healthCares/health-cares.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddHealthCareComponent } from '../add-health-care/add-health-care.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-health-cares',
  templateUrl: './health-cares.component.html',
  styleUrls: []
})
export class HealthCaresComponent implements OnInit {

  constructor(
    private obrasSocialesService: HealthCaresService,
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
    const dialogRef = this.dialogRef.open(AddHealthCareComponent, {
      height: '65vh',
      width: '50vw',
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
    const dialogRef = this.dialogRef.open(AddHealthCareComponent, {
      height: '40vw',
      width: '50vw',
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
