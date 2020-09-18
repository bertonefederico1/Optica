import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LensesService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(select?: string){
    if(select){
      return this.http.get<any>(`${this.URL}/lenses/${select}`);
    } else {
      return this.http.get<any>(`${this.URL}/lenses`);
    }
    
  }

  getOne(lensID: number){
    return this.http.get<any>(`${this.URL}/lens/${lensID}`)
  }

  addLens(lens: any){
    return this.http.post(`${this.URL}/newLens`, lens);
  }

  editLens(lensID: number, lens) {
    return this.http.put(`${this.URL}/editLens/${lensID}`, lens); 
  }

  deleteLens(lensID: number) {
    return this.http.put(`${this.URL}/suspendLens/${lensID}`, false);
  }

  //Get para materiales, acabados y diseños de los lentes

  getLensMaterials(){
    return this.http.get<any>(`${this.URL}/materialsLens`);
  }

  getLensFinishes(){
    return this.http.get<any>(`${this.URL}/finishesLens`);
  }

  getLensDesigns(){
    return this.http.get<any>(`${this.URL}/designsLens`);
  }
}
