import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthCaresService } from './../../../services/healthCares/health-cares.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-report-health-care',
  templateUrl: './report-health-care.component.html',
  styles: [
  ]
})
export class ReportHealthCareComponent implements OnInit {

  constructor(
    private healthCaresService: HealthCaresService
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

  generateReport(){
    const options = {
      filename: "Reporte Obra Social",
      margin: 2,
      image: {type: 'jpeg', quality: '0.98'},
      html2canvas: { },
      jsPDF: {orientation: 'portrait'}
    };
    const supportingDocument: Element = document.getElementById('report');
    html2pdf()
      .from(supportingDocument)
      .set(options)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        window.open(pdf.output('bloburl'), '_blank');
      })
  }

  getYears(){
    for(let i = 2000; i <= this.date.getFullYear(); i++){
      this.years.push(i);
    }
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
        },
        err => alert(err.error.msg)
      )
  }

  calculateFarValue(farValue: any){
    const modifyDecimals = (decimals) => {
      if(decimals[1]){
        if(decimals[1].length === 1){
          decimals[1] = ''; 
          return decimals[1] + '0';
        } else if(decimals[1].length === 2){
          return '';
        };
      } else {
        return '.00';
      };
    }; 
    const decimals = farValue.toString().split('.');
    const decimalsTruncated = modifyDecimals(decimals);
    if(farValue > 0) {
      return '+' + farValue.toString() + decimalsTruncated;
    } else if(farValue < 0) {
      return '-' + farValue.toString() + decimalsTruncated;
    }
  }

}
