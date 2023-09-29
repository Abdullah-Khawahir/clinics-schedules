import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
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

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // this.auth.onLogin(() => this.isLoggedIn = true)
    // this.auth.onLogOut(() => this.isLoggedIn = false)

    this.auth.isLoggedIn()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.auth.onLogOut(() => {
      console.log("logout");
      this.router.navigate(["/"])
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
