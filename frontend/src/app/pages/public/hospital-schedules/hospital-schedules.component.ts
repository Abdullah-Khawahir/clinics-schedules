import { Component, OnDestroy } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, Subject, catchError, ignoreElements, map, of, retry, share, shareReplay, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FullClinic } from 'src/app/models/FullClinic';
interface eventInfo {
  eventFinish: string | Date,
  eventStart: string | Date,
  employees: EmployeeDto[],
  note: string
}
interface DayOfEvents {
  day: Date,
  events: eventInfo[]
}
const HOSPITAL_ID_KEY = 'last-hospitalID';
@Component({
  selector: 'app-hospital-schedules',
  templateUrl: './hospital-schedules.component.html',
  styleUrls: ['./hospital-schedules.component.css'],

})
export class HospitalSchedulesComponent implements OnDestroy {
  event$ = new BehaviorSubject(true);

  AllHospitals$ = this.api.getAllHospitals()
    .pipe(map(hospitalDtoList =>
      [
        { hospitalName: "All", id: undefined },
        ...hospitalDtoList
          .map(hospital => { return { hospitalName: hospital.englishName, id: hospital.id as number } })
      ]
    ))

  AllHospitalsErr$ = this.AllHospitals$
    .pipe(ignoreElements(), catchError(err => of(err)))


  hospitalId = localStorage.getItem(HOSPITAL_ID_KEY) || undefined

  clinics$ = this.event$.pipe(
    startWith(null),
    switchMap(() => this.api
      .getAllClinics(this.hospitalId)
      .pipe(
        startWith(null),
      )
    )

  )

  clinicsError$ = this.clinics$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )
  clinicFilter: string = "";
  unsubscribe$ = new Subject<void>();
  constructor(private api: API) { }

  setHospitalID(id: number | undefined) {
    if (id != undefined) {
      localStorage.setItem('last-hospitalID', id.toString())
      this.hospitalId = id.toString()
    } else {
      localStorage.removeItem('last-hospitalID')
      this.hospitalId = undefined
    }
    this.event$.next(true)

  }


  getAllEvents(clinic: FullClinic) {
    if (clinic.schedules.length == 0) return;
    if (!this.doesClinicPassFilter(clinic)) return;
    const weeks = 8 // TODO: make it env var
    let FourWeeksEvents = new Array<DayOfEvents>(7 * weeks) // 8 weeks

    let currentWeek = moment().startOf('week').add(-1, "day")
    for (let i = 0; i < FourWeeksEvents.length; i++) {
      FourWeeksEvents[i] = {
        day: currentWeek.add(1, 'day').toDate(),
        events: []
      }
    }

    clinic.schedules.forEach(schedule => {
      if (this.isWithInNeededWeeks(schedule.beginDate, schedule.expireDate , weeks)) {
    
        FourWeeksEvents.forEach(dailyEvent => {
          schedule.events.forEach(scheduleEvent => {
            if (moment(scheduleEvent.finishTime).isSame(dailyEvent.day, 'day')) {
              dailyEvent.events.push({
                eventFinish: new Date(scheduleEvent.finishTime),
                eventStart: new Date(scheduleEvent.beginTime),
                employees: schedule.employees,
                note: schedule.note
              })
            }

          })
        })

      }
    })


    return FourWeeksEvents
  }
  

  private isWithInNeededWeeks(dateStart: number | string, dateEnd: number | string ,  numberOfWeeks:number ) {
    let weeksStart = moment().startOf('week')
    let weeksEnd = moment().add(numberOfWeeks, 'week')

    return moment(dateStart).isBetween(weeksStart, weeksEnd) || moment(dateEnd).isBetween(weeksStart, weeksEnd);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
    this.event$.complete()
  }

  doesClinicPassFilter(clinic: FullClinic): boolean {
    if (this.clinicFilter.trim().length == 0) return true;
    const to12H = (time24h: string) => {
      const [hour, minute] = time24h.split(":")
      return moment().hour(+hour).minute(+minute).format("hh:mma")
    }
    const clinicAsString = Object.values(
      [
        // clinic.arabicName,
        clinic.englishName,
        clinic.number,
        clinic.schedules.map(schedule => schedule.employees.map(emp => [emp.englishName])),

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


