import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API } from 'src/app/api.service';
import { Role, UserDto } from 'src/app/dto/UserDto';
import { FormType } from 'src/app/models/interfaces';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css', "./../../styles/popup-form.css"]
})
export class UserFormComponent implements OnInit {
  @Output() shouldClose = new EventEmitter<boolean>(false);

  @Input({ required: false }) user!: UserDto;
  @Input({ required: true }) formType!: FormType;
  rolesString!: string;
  constructor(public api: API) { }

  ngOnInit(): void {
    if (this.user == undefined) {
      this.user = {
        id: -1,
        username: "",
        password: "",
        email: "",
        roles: []
      };
      this.rolesString = ''
    } else {
      this.rolesString = this.user.roles.join(' , ')
    }


  }

  submit(formValue: any) {
    let user: UserDto = {
      id: this.formType == 'Create' ? -1 : this.user.id,
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      roles: (formValue.roles as string).toUpperCase().split(",").map(role => role.trim()) as Role[]
    };

    console.log(user);


  }


  close() {
    this.shouldClose.emit(true);
  }
}
