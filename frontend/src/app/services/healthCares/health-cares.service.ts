import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthCaresService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/healthCares`);
  }

  getOne(healthCareID: number){
    return this.http.get<any>(`${this.URL}/healthCare/${healthCareID}`);
  }

  addHealthCare(healthCare: any){
    return this.http.post(`${this.URL}/newHealthCare`, healthCare);
  }

  editHealthCare(healthCare: any, healthCareID: number){
    return this.http.put(`${this.URL}/editHealthCare/${healthCareID}`, healthCare);
  }

  deleteHealthCare(healthCareID: number){
    return this.http.put(`${this.URL}/suspendHealthCare/${healthCareID}`, false);
  }
}
