import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private http: HttpClient) { }

  readonly URL: string= "http://localhost:3000"

  getPrescriptionsBycustomerID(customerID: number){
    return this.http.get(`${this.URL}/prescriptionsById/${customerID}`);
  }

  getPrescriptionByGlasses(glassesNumber: number){
    return this.http.get(`${this.URL}/prescriptionByGlasses/${glassesNumber}`);
  }

  getOne(prescritionID: number){
    return this.http.get(`${this.URL}/prescription/${prescritionID}`);
  }

  addPrescription(prescription: any){
    return this.http.post(`${this.URL}/newPrescription`, prescription);
  }

  editPrescription(prescription: any, prescriptionID: number){
    return this.http.put(`${this.URL}/editPrescription/${prescriptionID}`, prescription);
  }

  deletePrescription(prescriptionID: number){
    return this.http.put(`${this.URL}/deletePrescription/${prescriptionID}`, false);
  }
}
