import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/notifier.service';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$ = this.user.isLoggedIn();
  constructor(public notify: NotifierService, public user: UserService, private router: Router) { }

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

  shouldSayHi() {
    this.notify.notify({
      type: 'CONFIRM',
      message: 'should say hi',
      action: () => console.log('hi')
    })
  }
}
