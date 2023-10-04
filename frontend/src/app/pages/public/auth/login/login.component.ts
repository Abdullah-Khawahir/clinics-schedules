import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message!: string;
  password!: string;
  username!: string;


  constructor(public user: UserService, public router: Router) { }
  submit() {
    this.user.login(this.username, this.password)

  }

}
