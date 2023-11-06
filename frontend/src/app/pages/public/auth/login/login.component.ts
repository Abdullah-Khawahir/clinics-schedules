import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message!: string ;
  password!: string;
  username!: string;


  constructor(public user: UserService) { }

  submit() {
    this.message = ""
    this.user.login$(this.username, this.password)
      .pipe(catchError(err => this.message = err.error.message))
      .subscribe()
  }

}
