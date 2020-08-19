import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000/clientes"

  getAll(){
    return this.http.get<any>(`${this.URL}`);
  }

}
