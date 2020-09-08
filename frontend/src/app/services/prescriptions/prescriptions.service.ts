import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getPrescriptionsBycustomerID(customerID: number){
    return this.http.get(`${this.URL}/prescriptionsById/${customerID}`);
  }
}
