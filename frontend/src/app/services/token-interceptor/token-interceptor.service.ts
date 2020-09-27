import { Injectable } from '@angular/core';
import { HttpHeaders, HttpInterceptor } from "@angular/common/http";
import { LoginService } from './../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(req, next){

    /* const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`
    });

    const reqClone = req.clone({
      headers
    }); */

    return next.handle(req);
  }
    

}
