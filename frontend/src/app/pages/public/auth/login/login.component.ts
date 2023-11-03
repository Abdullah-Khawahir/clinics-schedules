import { Component } from '@angular/core';
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


  constructor(public user: UserService) { }

  submit() {
    console.log(this.password
      , this.username);

    this.user.login(this.username, this.password)
  }

}
