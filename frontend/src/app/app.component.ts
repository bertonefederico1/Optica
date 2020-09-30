import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public loginService: LoginService,
    private router: Router
  ){ }

  title = 'OpticaVLA';
  userRole: string;


  getUserRole(){
    this.loginService.getUserRole()
      .subscribe(res => this.userRole = res.payload.role);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
