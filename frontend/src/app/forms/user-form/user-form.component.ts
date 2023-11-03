import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { Role, UserDto } from 'src/app/dto/UserDto';
import { FormType } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

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
  constructor(public api: API, public notifier: NotifierService) { }

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

    if (this.formType == 'Create')
      this.api.userDataSource.save(user)
        .subscribe({ ...this.notifier.submitResponse() })
        
    if (this.formType == 'Update')
      this.api.userDataSource.update(user.id, user)
        .subscribe({ ...this.notifier.submitResponse() })
  }


  close() {
    this.shouldClose.emit(true);
  }
}
