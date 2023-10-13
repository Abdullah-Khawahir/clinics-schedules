import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FullClinic } from 'src/app/models/FullClinic';
import { RequestState } from 'src/app/models/interfaces';
import { UserService } from 'src/app/user.service';
interface eventInfo {

  eventFinish: string | Date,
  eventStart: string | Date,
  employees: EmployeeDto[],
  // isPassed:boolean
}
interface DayOfEvents {
  day: Date,
  events: eventInfo[]
}
@Component({
  selector: 'app-hospital-schedules',
  templateUrl: './hospital-schedules.component.html',
  styleUrls: ['./hospital-schedules.component.css'],

})
export class HospitalSchedulesComponent implements OnInit, OnDestroy {
  clinics!: FullClinic[]
  allClinics!: Set<ClinicDto>
  clinicFilter: string = "";
  requestState!: RequestState;
  unsubscribe$ = new Subject<void>();
  constructor(
    private api: API,
    private userService: UserService,) { }



  ngOnInit(): void {
    this.fetchClinics();
  }

  private fetchClinics() {
    this.requestState = 'loading'
    this.api
    .getAllClinics()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (value) => {
        this.setClinics(value.filter(clinic => clinic.schedules.length));
        this.requestState = 'complete';
      },
      complete: () => {
        this.requestState = 'complete';
      }
    });
  }



  setClinics(clinics: FullClinic[]) {
    this.clinics = clinics;
  }

  getAllEvents(clinic: FullClinic) {
    if (clinic.schedules.length == 0) return;
    if (!this.doesClinicPassFilter(clinic)) return;
    let FourWeeksEvents = new Array<DayOfEvents>(7 * 4)

    let currentWeek = moment().startOf('week').add(-1, "day")
    for (let i = 0; i < FourWeeksEvents.length; i++) {
      FourWeeksEvents[i] = {
        day: currentWeek.add(1, 'day').toDate(),
        events: []
      }
    }

    clinic.schedules
      .forEach(schedule => {
        if (this.isWithInFourWeeks(schedule.beginDate, schedule.expireDate)) {
          FourWeeksEvents.forEach(dailyEvent => {
            schedule.events
              .forEach(scheduleEvent => {

                if (moment(scheduleEvent.finishTime).isSame(dailyEvent.day, 'day')) {


                  dailyEvent.events.push({
                    eventFinish: new Date(scheduleEvent.finishTime),
                    eventStart: new Date(scheduleEvent.beginTime),
                    employees: schedule.employees
                  })
                }

              })
          })

        }
      })

    return FourWeeksEvents
  }


  private isWithInFourWeeks(dateStart: number | string, dateEnd: number | string) {
    let weeksStart = moment().startOf('week')
    let weeksEnd = moment().add(4, 'week')

    return moment(dateStart).isBetween(weeksStart, weeksEnd) || moment(dateEnd).isBetween(weeksStart, weeksEnd);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  doesClinicPassFilter(clinic: FullClinic): boolean {
    if (this.clinicFilter.trim().length == 0) return true;
    const to12H = (time24h: string) => {
      const [hour, minute] = time24h.split(":")
      return moment().hour(+hour).minute(+minute).format("hh:mma")
    }
    const clinicAsString = Object.values(
      [
        clinic.arabicName,
        clinic.englishName,
        clinic.number,
        clinic.schedules.map(schedule => schedule.employees.map(emp => [emp.arabicName, emp.englishName])),

        clinic.schedules.map(schedule => [
          to12H(schedule.eventStart),
          to12H(schedule.eventFinish),
          schedule.eventFinish,
          schedule.eventStart]),
      ])
      .flatMap(v => v.toString())
      .join().toLowerCase()

    return this.clinicFilter.trim().toLowerCase().split(" ")
      .map(searchTerm => clinicAsString.includes(searchTerm))
      .includes(true)
  }
}


