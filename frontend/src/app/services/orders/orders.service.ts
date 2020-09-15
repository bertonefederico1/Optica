import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/orders`);
  }

  /* getOne(lensID: number){
    return this.http.get<any>(`${this.URL}/lens/${lensID}`)
  } */

  addOrder(order: any){
    return this.http.post(`${this.URL}/newOrder`, order);
  }

  /* editLens(lensID: number, lens) {
    return this.http.put(`${this.URL}/editLens/${lensID}`, lens); 
  }

  deleteLens(lensID: number) {
    return this.http.put(`${this.URL}/suspendLens/${lensID}`, false);
  } */
}
