import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  readonly URL: string= "http://localhost:3000"

  login(user: any){
    return this.http.post(`${this.URL}/login`, user);
  }

  isLogged(): Boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUserRole(){
    return this.http.get<any>(`${this.URL}/getUserRole`);
  }

  getNameUserRole(){
    if(localStorage.getItem('role')){
      return localStorage.getItem('role');
    }
  }

  getUsername(){
    if(localStorage.getItem('username')){
      return localStorage.getItem('username');
    }
  }

}
