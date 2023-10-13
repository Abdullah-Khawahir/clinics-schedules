import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicScheduleDto, RepeatUnit } from 'src/app/dto/ClinicScheduleDto';
import { FormType, RequestState, SelectInputOption } from 'src/app/models/interfaces';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css', "./../../styles/popup-form.css"]
})
export class ScheduleFormComponent implements OnInit, OnDestroy {
onSelect() {
throw new Error('Method not implemented.');
}
  @Output() shouldClose = new EventEmitter<boolean>();
  @Input({ required: false }) schedule!: ClinicScheduleDto;
  @Input({ required: true }) formType!: FormType;



  employeeInput: Array<any> = new Array(this.schedule?.employees.length || 1)

  clinicsAsOptions!: SelectInputOption[]
  clinicRequestState: RequestState = 'loading'

  employeesAsOptions!: SelectInputOption[]
  employeeRequestState: RequestState = 'loading'

  unsubscribe$ = new Subject<void>();
  constructor(private api: API) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }



  ngOnInit(): void {
    if (this.schedule == undefined) {
      this.schedule = {
        id: -1,
        beginDate: -1,
        expireDate: -1,
        clinicId: -1,
        eventFinish: "",
        eventStart: "",
        employees: [],
        events: [],
        repeat: "" as RepeatUnit
      }
    }

    this.getClinicsAsOptions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value) => {
          this.clinicRequestState = 'complete'
          this.clinicsAsOptions = value
        }
      })

    this.getEmployeesAsOptions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value) => {
          this.employeeRequestState = 'complete'
          this.employeesAsOptions = value
        }
      })
  }


  getClinicsAsOptions(): Observable<SelectInputOption[]> {
    this.clinicRequestState = 'loading'
    return this.api.clinicDataSource
      .getAll()
      .pipe(map(clinics => clinics.map(
        clinic => {
          return { name: `${clinic.englishName} # ${clinic.number}`, value: clinic.id.toString() }
        })))

  }
  getEmployeesAsOptions(): Observable<SelectInputOption[]> {
    this.employeeRequestState = 'loading'
    return this.api.employeeDataSource
      .getAll()
      .pipe(map(employees => employees.map(
        employee => {
          return { name: `${employee.englishName}`, value: employee.id.toString() }
        })))
  }


  submit(formValue: HTMLFormElement) {
    let clinicId = (formValue.elements.namedItem('selectedClinic') as HTMLInputElement).value
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
      -1,
      Number.parseInt(clinicId),
      new Date(beginDate).getTime(),
      new Date(expireDate).getTime(),
      eventStart,
      eventFinish,
      repeat,
      [],
      []
    )
    this.api.clinicScheduleDataSource.save(schedule)
      .subscribe({
        error: (err) => {
        }, next: (schedule) => {
          this.api.addEmployeesToScheduleByIds(schedule.id, employees)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.close())
        }
      })




  }


  addEmployeeInputIfNeeded(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value != "None") {
      this.employeeInput = [...this.employeeInput, ""]
    } else if (value == "None" && this.employeeInput.length != 1) {
      this.employeeInput.pop()
      this.employeeInput = [...this.employeeInput]
    }
  }

  close() {
    this.shouldClose.emit(true)
  }

}
