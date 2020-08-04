import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LensesService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "https://jsonplaceholder.typicode.com/albums"

  getAll(){
    return this.http.get<any>(`${this.URL}`);
  }
}
