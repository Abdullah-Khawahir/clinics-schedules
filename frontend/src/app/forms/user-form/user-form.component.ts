import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API } from 'src/app/api.service';
import { UserDto } from 'src/app/dto/UserDto';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css', "./../../styles/popup-form.css"]
})
export class UserFormComponent {
  @Output() shouldClose = new EventEmitter<boolean>(false);


  @Input({ required: false }) username: string = "";
  @Input({ required: false }) email: string = "";
  @Input({ required: false }) password: string = "";
  @Input({ required: false }) roles: string = "";

  constructor(public api: API) { }

  submit(formValue: any) {
    let user: UserDto = {
      id: -1,
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      roles: (formValue.roles as string).toUpperCase().split(",")
    };

    // this.api.
  }


  close() {
    this.shouldClose.emit(true);
  }
}
