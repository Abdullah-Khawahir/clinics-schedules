import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {

  constructor(private authManger: AuthenticationService) {

  }

  isLoggedIn(){
    return this.authManger.isAuthentication()
  }
}
