import { Component } from '@angular/core';
import { API } from 'src/app/api.service';
import Logger from 'src/app/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  output: string;
  password: string;
  username: string;
  api: API;

  constructor(http: API) {
    this.api = http;
  };
  submit() {
    Logger.info(this.password)
    Logger.info(this.username)

    let user = {
      id: 0,
      username: this.username,
      password: this.password,
      email: "",
      roles: []
    };
    Logger.info(user)
    this.api.auth(user)
      .subscribe(user => this.output = JSON.stringify(user))
  }

}
