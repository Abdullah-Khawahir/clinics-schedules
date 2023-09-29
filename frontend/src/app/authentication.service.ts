import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService) { }

  login(username: string, password: string) {
    return this.userService.login(username, password)
  }

  logout() {
    return this.userService.logout()
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
