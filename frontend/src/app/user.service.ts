import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from './dto/UserDto';
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

  private currentUser$ = new BehaviorSubject<LoginData>({
    username: "abdullah", password: "4484", authorities: []
  });
  private isLogged$ = new BehaviorSubject<boolean>(true)

  constructor(private http: HttpClient) {
    console.warn("auto login is active");
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
    return this.currentUser$
  }
  
  onLogin(fn: (() => void)) {
    this.onLogInFunctions.push(fn)
  }
  onLogOut(fn: (() => void)) {
    this.onLogoutFunctions.push(fn)
  }

}
