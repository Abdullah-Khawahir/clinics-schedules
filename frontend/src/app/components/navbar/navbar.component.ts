import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean;

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // this.auth.onLogin(() => this.isLoggedIn = true)
    // this.auth.onLogOut(() => this.isLoggedIn = false)

    this.auth.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.auth.onLogOut(() => {
      console.log("logout");
      this.router.navigate(["/"])
    })

  }
}
