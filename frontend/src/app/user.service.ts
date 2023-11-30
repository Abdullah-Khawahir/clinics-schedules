import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  private currentUser$ = new BehaviorSubject<LoginData>(EMPTY_LOGIN_DATA);
  private isLogged$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {

    this.login$("abdullah", "4484").subscribe()
  }


  private auth(user: UserDto) {
    return this.http.post<UserDto>(environment.API_SERVER + "/public/auth", user)
  }

  login$(username: string, password: string) {
    return this.auth({ id: 0, username: username, password: password, email: "", roles: [] })
      .pipe(tap({
        next: (user) => {
          if (user.password == password && user.username == username) {
            this.currentUser$.next({
              username: username,
              password: user.password,
              authorities: user.roles,
            })
            this.isLogged$.next(true)
            this.onLogInFunctions.forEach(fn => fn())
          }
        }
      }))

  }

  isAdmin() {
    return this.currentUser$.value.authorities.map(i => i.toUpperCase()).includes('ADMIN');
  }

  isDev() {
    return this.currentUser$.value.authorities.map(i => i.toUpperCase()).includes('DEV');
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
