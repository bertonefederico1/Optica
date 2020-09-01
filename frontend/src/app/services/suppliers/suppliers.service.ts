import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/suppliersLaboratories`);
  }

  addSupplier(supplier: any){
    return this.http.post(`${this.URL}/newSupplierLaboratory`, supplier);
  }
}
