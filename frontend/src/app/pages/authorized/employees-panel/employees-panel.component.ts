import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-employees-panel',
  templateUrl: './employees-panel.component.html',
  styleUrls: ['./employees-panel.component.css']
})
export class EmployeesPanelComponent implements OnInit, OnDestroy {
  employeeList!: EmployeeDto[]
  columnDefinition!: Column[]
  tableState: RequestState = 'loading'
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(public api: API) { }
  ngOnInit(): void {
    this.api.employeeDataSource.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        complete: () => {
          this.tableState = 'complete'
        },
        error: (err) => {
          this.tableState = 'error'
        },
        next: (value) => {
          this.employeeList = value
        }
      })

    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "email", displayLabel: "E-mail" },
      { key: "phoneNumber", displayLabel: "Phone NO." },
      { key: "secondPhoneNumber", displayLabel: "Second Phone NO." },
    ]

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
