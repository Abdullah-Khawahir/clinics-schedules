import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Observable, Subject, catchError, ignoreElements, map, of, takeUntil, tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicScheduleDto, RepeatUnit } from 'src/app/dto/ClinicScheduleDto';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FormType, SelectInputOption } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css', "./../../styles/popup-form.css"]
})
export class ScheduleFormComponent implements OnInit, OnDestroy {

  @Output() shouldClose = new EventEmitter<boolean>();
  @Input({ required: false }) schedule!: ClinicScheduleDto;
  @Input({ required: true }) formType!: FormType;


  employeesId!: Array<string>;

  clinicsAsOptions$ = this.getClinicsAsOptions()
  clinicsAsOptionsError$ = this.clinicsAsOptions$
    .pipe(
      ignoreElements(),
      catchError(err => of(new Error('cant fetch data')))
    )

  employeesAsOptions$ = this.getEmployeesAsOptions()
  employeesAsOptionsError$ = this.employeesAsOptions$
    .pipe(
      ignoreElements(),
      catchError(err => of(new Error('cant fetch data')))
    )

  unsubscribe$ = new Subject<void>();
  constructor(private api: API, public notifier: NotifierService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }



  ngOnInit(): void {
    if (this.schedule == undefined) {
      this.schedule = {
        id: '' as unknown as number,
        beginDate: moment().startOf('day').format('YYYY-MM-DD'),
        expireDate: "",
        clinicId: '' as unknown as number,
        eventFinish: "",
        eventStart: "",
        employees: [],
        events: [],
        repeat: "" as RepeatUnit,
        note: ""
      }
    }
    if (this.formType == 'Create') {
      this.employeesId = [""]
    } else {
      this.employeesId = this.schedule?.employees.map(e => e.id.toString())
      this.schedule.beginDate = moment(this.schedule.beginDate).startOf('day').format('YYYY-MM-DD')
      this.schedule.expireDate = moment(this.schedule.expireDate).endOf('day').format('YYYY-MM-DD')

    }
  }


  getClinicsAsOptions(): Observable<SelectInputOption[]> {
    return this.api.clinicDataSource
      .getAll()
      .pipe(map(clinics => clinics.map(
        clinic => {
          return { name: `${clinic.englishName} # ${clinic.number}`, value: clinic.id.toString() }
        })))

  }
  getEmployeesAsOptions(): Observable<SelectInputOption[]> {
    return this.api.employeeDataSource
      .getAll()
      .pipe(map(employees => employees
        .map(
          employee => {
            return { name: `${employee.id}:${employee.englishName}`, value: employee.id.toString() }
          })))
  }


  submit(formValue: HTMLFormElement) {
    let clinicId = (formValue.elements.namedItem('clinicId') as HTMLInputElement).value
    let beginDate = (formValue.elements.namedItem('beginDate') as HTMLInputElement).value
    let expireDate = (formValue.elements.namedItem('expireDate') as HTMLInputElement).value
    let repeat = (document.getElementById('select-repeat') as HTMLInputElement).value as RepeatUnit
    let eventStart = (formValue.elements.namedItem('eventStart') as HTMLInputElement).value
    let eventFinish = (formValue.elements.namedItem('eventFinish') as HTMLInputElement).value
    let employees: number[] = []
    let employeesInput = (document.getElementsByClassName('selectedEmployee') as HTMLCollectionOf<HTMLInputElement>)

    for (let i = 0; i < employeesInput.length; i++) {
      const element = employeesInput[i];
      if (element.value != 'None') {
        employees.push(+element.value)
      }

    }

    let schedule = new ClinicScheduleDto(
      this.formType == 'Create' ? -1 : this.schedule.id,
      Number.parseInt(clinicId),
      moment(new Date(beginDate).getTime()).startOf('day').toDate().getTime(),
      moment(new Date(expireDate).getTime()).endOf('day').toDate().getTime(),
      eventStart,
      eventFinish,
      repeat,
      [],
      this.employeesId.map(employeeId => new EmployeeDto(Number.parseInt(employeeId), "", "", "")),
      (formValue.elements.namedItem('note') as HTMLInputElement).value ?? ""
    )
    if (this.formType == 'Create') {
      this.api.clinicScheduleDataSource.save(schedule)
        .subscribe({ ...this.notifier.submitResponse() })

    }
    if (this.formType == 'Update') {
      this.api.clinicScheduleDataSource
        .update(schedule.id, schedule)
        .subscribe({ ...this.notifier.submitResponse() })
    }
  }

  expandEmployeeIdByOne() {
    this.employeesId.push("")
  }

  setEmployee(value: string, index: number) {
    this.employeesId[index] = value
  }

  removeEmployee(index: number) {
    this.employeesId = this.employeesId.filter((v, i, a) => i != index)
  }


  trackByIndex(index: number, item: any) { return index; }

  isEmployeeChosen = (employee: SelectInputOption) => {
    return this.employeesId.includes(employee.value)
  }

  close() {
    this.shouldClose.emit(true)
  }


}
