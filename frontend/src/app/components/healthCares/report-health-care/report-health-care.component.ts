import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthCaresService } from './../../../services/healthCares/health-cares.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpReportComponent } from '../pop-up-report/pop-up-report.component';

@Component({
  selector: 'app-report-health-care',
  templateUrl: './report-health-care.component.html',
  styles: [
  ]
})
export class ReportHealthCareComponent implements OnInit {

  constructor(
    private healthCaresService: HealthCaresService,
    private dialogRef: MatDialog
  ) { }

  date = new Date();
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = [];
  healthCares$: Observable<any[]>;
  glasses: any[];

  reportForm = new FormGroup({
    year: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    monthNumber: new FormControl('', Validators.required),
    healthCare: new FormControl('', Validators.required),
    receiptNumber: new FormControl('', Validators.required)
  });
  
  ngOnInit(): void {
    this.healthCares$ = this.healthCaresService.getAll();
    this.getYears();
  }

  searchReport(){
    const month = this.reportForm.get('month').value;
    const monthNumber = parseInt((this.months.indexOf(month) + 1).toString().padStart(2, '0'));
    this.reportForm.patchValue({
      monthNumber: monthNumber
    });
    this.healthCaresService.getGlassesByHealthCareAndDate(this.reportForm.value)
      .subscribe(
        res => {
          this.glasses = res;
          this.dialogRef.open(PopUpReportComponent, {
            height: '100%',
            width: '100%',
            data: {
              glasses: this.glasses,
              dataSearch: this.reportForm.value
            }
          });
        },
        err => alert(err.error.msg)
      )
  }

  getYears(){
    for(let i = 2000; i <= this.date.getFullYear(); i++){
      this.years.push(i);
    }
  }

}
