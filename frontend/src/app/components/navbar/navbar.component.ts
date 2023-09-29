import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/user.service';
interface route {
  name: string,
  path: string,
  private?: boolean
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn!: boolean;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public user: UserService, private router: Router) { }

  ngOnInit(): void {


    this.user.isLoggedIn()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.user.onLogin(() => {
      console.log("login");
      this.router.navigate(["/dashboard"])
    })
    this.user.onLogOut(() => {
      console.log("logout");
      this.router.navigate(["/"])
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
