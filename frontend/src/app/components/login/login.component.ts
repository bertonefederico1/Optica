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
  userRole: string;
  username: string;

  login(){
    this.loginService.login(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res['token']);
        },
        err => alert(err.error.msg),
        () => {
          this.loginService.getUserRole()
            .subscribe(
              res => {
                this.userRole = res.payload.role;
                this.username = res.payload.username;
                localStorage.setItem('role', this.userRole);
                localStorage.setItem('username', this.username);
                console.log(localStorage.getItem('username'));
                this.router.navigate(['/inicio']);
              }
            )
        }
      )
  }
}
