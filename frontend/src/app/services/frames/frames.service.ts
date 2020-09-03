import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FramesService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getAll(){
    return this.http.get<any>(`${this.URL}/frames`);
  }

  addFrame(frame: any){
    return this.http.post(`${this.URL}/newFrame`, frame);
  }

  getOne(frameID: number){
    return this.http.get<any>(`${this.URL}/frame/${frameID}`)
  }

  editFrame(frameID: number, frame: any) {
    return this.http.put(`${this.URL}/editFrame/${frameID}`, frame); 
  }

  deleteFrame(frameID: number) {
    return this.http.put(`${this.URL}/suspendFrame/${frameID}`, false);
  }

  //Gets para materiales, diseños y utilidades de los armazones

  getFrameMaterials(){
    return this.http.get<any>(`${this.URL}/frameMaterials`);
  }

  getFramesUtilities(){
    return this.http.get<any>(`${this.URL}/frameUtilities`);
  }

  getFramesDesigns(){
    return this.http.get<any>(`${this.URL}/frameDesigns`);
  }
  
}
