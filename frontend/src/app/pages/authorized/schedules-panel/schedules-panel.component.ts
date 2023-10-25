import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { catchError, ignoreElements, of, tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicScheduleDto } from 'src/app/dto/ClinicScheduleDto';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { Column } from 'src/app/models/interfaces';

@Component({
  selector: 'app-schedules-panel',
  templateUrl: './schedules-panel.component.html',
  styleUrls: ['./schedules-panel.component.css']
})
export class SchedulesPanelComponent implements OnInit {
  schedules$ = this.api.clinicScheduleDataSource
    .getAll()

  schedulesError$ = this.schedules$
    .pipe(
      ignoreElements(),
      catchError((err) => of(err)))
  columns!: Column[];


  editFormClosed = true;
  scheduleToEdit!: ClinicScheduleDto;

  remove = (schedule: ClinicScheduleDto) => {
    this.api.clinicScheduleDataSource
      .delete(schedule.id)
      .subscribe({ next: () => this.fetchAllSchedules() })
  }
  edit = (target: ClinicScheduleDto) => {

    this.scheduleToEdit = target
    this.toggleEditForm()
  }



  constructor(public api: API, public snackBar: MatSnackBar) { }

  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed
  }
  ngOnInit(): void {
    this.columns = [
      { key: 'id', displayLabel: "ID" },
      { key: 'clinicId', displayLabel: "Clinic ID" },
      { key: 'beginDate', displayLabel: "Begin Date", mapper: (beginDate) => moment(beginDate).format("dd DD/MM/YYYY") },
      { key: 'expireDate', displayLabel: "Expire Date", mapper: (expireDate) => moment(expireDate).format("dd DD/MM/YYYY") },
      { key: 'eventStart', displayLabel: "Event Start" },
      { key: 'eventFinish', displayLabel: "Event Finish" },
      { key: 'repeat', displayLabel: "Repeat" },
      { key: 'employees', displayLabel: "Employees", mapper: (value: EmployeeDto[]) => value.map(employee => employee.englishName).join(" ") },
    ]

  }

  private fetchAllSchedules() {
    // this.api.clinicScheduleDataSource
    //   .getAll()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe({
    //     next: (value) => {
    //       this.schedules = value;
    //       this.tableState = 'complete';
    //     }, error: (err) => {
    //       this.tableState = 'error';
    //     }
    //   });
  }




}
