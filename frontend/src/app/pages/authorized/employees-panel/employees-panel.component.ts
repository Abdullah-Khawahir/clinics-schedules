import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, takeUntil, tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { Column, RequestState } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-employees-panel',
  templateUrl: './employees-panel.component.html',
  styleUrls: ['./employees-panel.component.css'],
})
export class EmployeesPanelComponent implements OnInit, OnDestroy {


  editFormClosed = true
  employeeToEdit!: EmployeeDto;

  employeeList$ = this.api.employeeDataSource.getAll()
  employeeListError$ = this.employeeList$
    .pipe(
      ignoreElements(),
      catchError(err => of(new Error('failed to connect to server'))))
  columnDefinition!: Column[]
  unsubscribe$: Subject<void> = new Subject<void>();

  remove = (employee: EmployeeDto) => {
    this.notifier.confirm(`are you sure you want to delete ${employee.englishName}`,
      () => this.api.employeeDataSource.delete(employee.id)
        .pipe(takeUntil(this.unsubscribe$))
        .pipe(tap({
          error: (err: HttpErrorResponse) => this.notifier.error(err.error.message),
          next: (v) => this.notifier.info(` ${employee.englishName} is Deleted`)
        }))
        .subscribe()
    )
  }

  edit = (employee: EmployeeDto) => {
    this.employeeToEdit = employee
    this.toggleEditForm()
  }
  constructor(public api: API, public notifier: NotifierService) { }

  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed
  }
  ngOnInit(): void {
    this.fetchAllEmployees();

    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "email", displayLabel: "E-mail" },
      { key: "phoneNumber", displayLabel: "Phone NO." },
      { key: "secondPhoneNumber", displayLabel: "Second Phone NO." },
    ]

  }


  private fetchAllEmployees() {



  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }



}
