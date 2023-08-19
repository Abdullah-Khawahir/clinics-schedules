import { Injectable } from '@angular/core';
type LoginData = {
  username: string,
  authority: string,
  isLogged: boolean,
}
@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  private loginData: LoginData = {
    username: "",
    authority: "",
    isLogged: false
  }
  constructor() { }

  login(username: string, password: string) {

  }

  logout() {

  }

  isAuthentication() {
    return this.loginData.isLogged
  }
}
