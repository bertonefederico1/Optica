import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>("https://jsonplaceholder.typicode.com/albums");
  }

}
