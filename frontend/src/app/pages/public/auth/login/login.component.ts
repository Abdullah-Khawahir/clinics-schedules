import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message!: string;
  password!: string;
  username!: string;


  constructor(public authentication: AuthenticationService, public router: Router) {
  };
  submit() {
    this.authentication.login(this.username, this.password)
    this.authentication.onLogin(() => { 
      this.router.navigate(["/dashboard"])
    })
  }

}
