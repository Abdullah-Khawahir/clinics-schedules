import { Component } from '@angular/core';
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
export class NavbarComponent {
  routes: route[] = [
    { path: "login", name: "login" },
    { path: "hospital-schedules", name: "schedules" },
    { path: "", name: "home" },
  ]

}
