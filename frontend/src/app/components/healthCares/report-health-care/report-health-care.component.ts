import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthCaresService } from './../../../services/healthCares/health-cares.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  reportForm = new FormGroup({
    year: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    healthCareID: new FormControl('', Validators.required)
  });
  
  ngOnInit(): void {
    this.healthCares$ = this.healthCaresService.getAll();
    this.getYears();
  }

  getYears(){
    for(let i = 2000; i <= this.date.getFullYear(); i++){
      this.years.push(i);
    }
  }

}
