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

  getOne(orderNumber: number){
    return this.http.get<any>(`${this.URL}/order/${orderNumber}`)
  }

  addOrder(order: any){
    return this.http.post(`${this.URL}/newOrder`, order);
  }

  editOrder(orderNumber: number, order: any) {
    return this.http.put(`${this.URL}/editOrder/${orderNumber}`, order); 
  }

  deleteOrder(orderNumber: number) {
    return this.http.put(`${this.URL}/suspendOrder/${orderNumber}`, false);
  }
}
