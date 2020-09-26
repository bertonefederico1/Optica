import { Injectable, ɵallowSanitizationBypassAndThrow } from '@angular/core';
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

  isLogged(){
    let isLogged: Boolean;
    if(localStorage.getItem('password')){
      isLogged = true;
    };
    return isLogged;
  }
}
