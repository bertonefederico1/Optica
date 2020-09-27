import { Component } from '@angular/core';
import { LoginService } from './../../services/login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [ ]
})
export class LoginComponent {
  
  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(){
    this.loginService.login(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res['token']);
          this.loginService.isLogged();
          this.router.navigate(['/inicio']);
        },
        err => alert(err.error.msg)
      );
  }
}
