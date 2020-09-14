import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(select?: string){
    if(select){
      return this.http.get<any>(`${this.URL}/customers/${select}`);
    } else {
      return this.http.get<any>(`${this.URL}/customers`);
    } 
  }

  getOne(customerID: number){
    return this.http.get<any>(`${this.URL}/customer/${customerID}`)
  }

  addCustomer(customer) {
    return this.http.post(`${this.URL}/newCustomer`, customer); 
  }

  editCustomer(customerID: number, customer) {
    return this.http.put(`${this.URL}/editCustomer/${customerID}`, customer); 
  }

  deleteCustomer(customerID: number) {
    return this.http.put(`${this.URL}/suspendCustomer/${customerID}`, false);
  }

}
