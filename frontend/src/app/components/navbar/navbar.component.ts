import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn$ = this.user.isLoggedIn();
  activeSetter$ = this.router.events
    .pipe(
      filter((event) => event instanceof ActivationEnd),
      map((event) => (event as ActivationEnd).snapshot),
      map((snap) => [...snap.url.map(url => url.path)]),
    )

  constructor(public user: UserService, public router: Router) { }

  setActive(navItem: EventTarget | null) {
    let lastActive = document.getElementsByClassName('active-nav-item');
    for (let i = 0; i < lastActive.length; i++) {
      lastActive[i].classList.remove('active-nav-item');
    }
    (navItem as HTMLElement).classList.add('active-nav-item')
  }
  ngOnInit(): void {
    // this.user.onLogin(() => {
    //   console.log("login");
    //   this.router.navigate(["/dashboard"])
    // })
    this.user.onLogOut(() => {
      console.log("logout");
      this.router.navigate(["/"])
    })
  }


}
