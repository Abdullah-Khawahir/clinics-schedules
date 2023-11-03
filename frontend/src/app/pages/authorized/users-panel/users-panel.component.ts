import { Component } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { API } from 'src/app/api.service';
import { UserDto } from 'src/app/dto/UserDto';
import { Column } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';
// './../../../styles/popup-form.css'
@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent {
  allUsers$ = this.api.userDataSource.getAll();
  allUsersError$ = this.allUsers$.pipe(
    ignoreElements(),
    catchError(err => of(new Error('cant fetch data'))))
  columns: Column[] = [
    { key: 'id', displayLabel: 'id' },
    { key: 'username', displayLabel: 'Username' },
    {
      key: 'email', displayLabel: 'Email',
    },
    {
      key: 'roles', displayLabel: 'Roles',
      mapper: (value: string[]) => value.sort().join(' ')
    },
  ]
  toEditUser!: UserDto;
  openEmployeeForm = false;

  remove = (target: UserDto) => {
    this.notifier.confirm(`are you sure you want to delete ${target.username}?`,
      () => {
        this.api.userDataSource.delete(target.id).subscribe({ ... this.notifier.submitResponse() })
      })
  }

  edit = (target: UserDto) => {
    this.toEditUser = target
    this.toggleEmployeeForm()
  }

  constructor(public api: API, public notifier: NotifierService) { }

  toggleEmployeeForm() {
    this.openEmployeeForm = !this.openEmployeeForm
  }

}
