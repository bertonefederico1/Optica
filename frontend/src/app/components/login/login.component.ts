import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  constructor(
    private loginService: LoginService
  ){}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(){
    this.loginService.login(this.loginForm.value)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('password', JSON.stringify(res));
        },
        err => alert(err.error.msg)
      );
  }

}
