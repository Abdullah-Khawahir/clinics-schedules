import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from './dto/UserDto';
import { HttpClient } from '@angular/common/http';
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
export class UserService {
  private onLogInFunctions: (() => void)[] = []
  private onLogoutFunctions: (() => void)[] = []

  private currentUser$ = new BehaviorSubject<LoginData>(EMPTY_LOGIN_DATA);
  private isLogged$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {
    for (let i = 0; i < 5; i++) {
      console.warn(i + ":auto login is active");
    }
    this.login("abdullah", "4484")
  }


  private auth(user: UserDto) {
    return this.http.post<UserDto>("http://localhost:8080" + "/public/auth", user)
  }

  login(username: string, password: string): Observable<LoginData> {
    this.auth({ id: 0, username: username, password: password, email: "", roles: [] })
      .subscribe(user => {
        if (user.password == password && user.username == username) {
          this.currentUser$.next({
            username: username,
            password: user.password,
            authorities: user.roles,
          })
          this.isLogged$.next(true)
          this.onLogInFunctions.forEach(fn => fn())
        }
      })
    return this.currentUser$
  }


  isLoggedIn() {
    return this.isLogged$.asObservable();
  }

  logout() {
    this.currentUser$.next(EMPTY_LOGIN_DATA)
    this.isLogged$.next(false)
    this.onLogoutFunctions.forEach(fn => fn())
  }

  getCurrentUser() {
    return this.currentUser$.asObservable()
  }
  onLogin(fn: (() => void)) {
    this.onLogInFunctions.push(fn)
  }
  onLogOut(fn: (() => void)) {
    this.onLogoutFunctions.push(fn)
  }

}
