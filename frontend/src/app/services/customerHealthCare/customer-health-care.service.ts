import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerHealthCareService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAllByCustomer(customerID: number){
    return this.http.get<any>(`${this.URL}/healthCaresByCustomer/${customerID}`);
  }

}
