import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/clientes`);
  }

  getOne(idCliente: number){
    return this.http.get<any>(`${this.URL}/cliente/${idCliente}`)
  }

  addClient(client) {
    return this.http.post(`${this.URL}/nuevoCliente`, client); 
  }

}
