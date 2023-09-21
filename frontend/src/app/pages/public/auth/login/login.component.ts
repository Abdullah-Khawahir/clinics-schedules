import { Component } from '@angular/core';
import { API } from 'src/app/api.service';
import Logger from 'src/app/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  output!: string;
  password!: string;
  username!: string;
  api: API;

  constructor(http: API) {
    this.api = http;
  };
  submit() {

    let user = {
      id: 0,
      username: this.username,
      password: this.password,
      email: "",
      roles: []
    };
    Logger.info(user)
    this.api.auth(user)
      .subscribe({
        next: (user) => {
          this.output = JSON.stringify(user)
          Logger.info(user)
        },
        error: (err) => {
          this.output = "RR"
        },
      });
  }

}
