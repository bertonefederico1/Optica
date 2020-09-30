import { Component, OnInit } from '@angular/core';
import { HealthCaresService } from '../../../services/healthCares/health-cares.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddHealthCareComponent } from '../add-health-care/add-health-care.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../../services/login/login.service';

@Component({
  selector: 'app-health-cares',
  templateUrl: './health-cares.component.html',
  styleUrls: []
})
export class HealthCaresComponent implements OnInit {

  constructor(
    private healthCareService: HealthCaresService,
    private dialogRef: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getUserRole();
    this.getAll();
  }

  edit: boolean;
  displayedColumns: string[] = ['codigo', 'nombre', 'periodoFacturacion', 'cantidadAnteojosPorPeriodo', 'acciones'];
  dataSource = null;
  userRole: string;

  getUserRole(){
    this.loginService.getUserRole()
      .subscribe(res => this.userRole = res.payload.role);
  }

  editHealthCare(healthCareID: number){
    this.edit = true;
    const dialogRef = this.dialogRef.open(AddHealthCareComponent, {
      height: '90%',
      width: '70%',
      disableClose: true,
      data: {
        edit: this.edit,
        healthCareID: healthCareID
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => this.getAll())
  }

  addHealthCare(){
    this.edit = false;
    const dialogRef = this.dialogRef.open(AddHealthCareComponent, {
      height: '90%',
      width: '70%',
      disableClose: true,
      data: this.edit
    });
    dialogRef.afterClosed()
      .subscribe(res => this.getAll())
  }

  deleteHealthCare(healthCareID: number){
    if (confirm("¿Seguro que desea eliminar la obra social?")){
      this.healthCareService.deleteHealthCare(healthCareID)
      .subscribe(
        res => this.getAll()
      )
    }
  }

  getAll(){
    this.healthCareService.getAll()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
        }
      )
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const textToSearch = data[column].toLowerCase();
      return textToSearch.indexOf(filter) !== -1;
    }
  }

  applyFilter(filterValue: string){ 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
