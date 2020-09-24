import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlassesService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"


  getAll(){
    return this.http.get<any>(`${this.URL}/glasses`);
  }

  getOne(glassesNumber: number){
    return this.http.get<any>(`${this.URL}/glasses/${glassesNumber}`)
  }

  addGlasses(glasses) {
    return this.http.post(`${this.URL}/newGlasses`, glasses); 
  }

  editGlasses(glassesNumber: number, glasses) {
    return this.http.put(`${this.URL}/editGlasses/${glassesNumber}`, glasses); 
  }

  deleteGlasses(glassesNumber: number) {
    return this.http.put(`${this.URL}/suspendGlasses/${glassesNumber}`, false);
  }
}
