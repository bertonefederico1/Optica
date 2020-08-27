import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/clientes`);
  }

  getOne(customerID: number){
    return this.http.get<any>(`${this.URL}/cliente/${customerID}`)
  }

  addCustomer(customer) {
    return this.http.post(`${this.URL}/nuevoCliente`, customer); 
  }

}
