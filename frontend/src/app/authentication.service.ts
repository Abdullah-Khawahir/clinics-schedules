import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API } from './api.service';
export interface LoginData {
  username: string,
  password: string,
  authorities: string[],

}
const EMPTY_LOGIN_DATA = {
  username: "",
  password: "",
  authorities: [],
}
@Injectable({
  providedIn: 'root'
})



export class AuthenticationService {
  private loginData$: BehaviorSubject<LoginData> = new BehaviorSubject<LoginData>(EMPTY_LOGIN_DATA);
  private onLogInFunctions: (() => void)[] = []
  private onLogoutFunctions: (() => void)[] = []
  private isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private api: API) {
    for (let i = 0; i < 5; i++) {
      console.warn(i + ":auto login is active");
    }
    this.login("abdullah", "4484")
  }

  login(username: string, password: string) {
    const userInfo = this.api
      .auth({ id: 0, username: username, password: password, email: "", roles: [] });
    userInfo
      .pipe()
      .subscribe(user => {
        if (user.password == password && user.username == username) {
          this.loginData$.next({
            username: username,
            password: user.password,
            authorities: user.roles,
          })
          this.isLogged$.next(true)
          this.onLogInFunctions.forEach(func => func())
        }
      })
    return userInfo
  }

  isLoggedIn() {
    return this.isLogged$.asObservable();
  }
  logout() {
    this.loginData$.next(EMPTY_LOGIN_DATA)
    this.isLogged$.next(false)
    this.onLogoutFunctions.forEach(fn => fn())
  }

  loginData() {
    return this.loginData$.asObservable()
  }

  onLogOut(fn: () => void) {
    this.onLogoutFunctions.push(fn)
  }

  onLogin(fn: () => void) {
    this.onLogInFunctions.push(fn)
  }

}
