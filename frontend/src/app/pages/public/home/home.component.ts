import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FullClinic } from 'src/app/models/FullClinic';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clinics!: FullClinic[]
  allClinics!: Set<ClinicDto>
  constructor(private http: HttpClient, private api: API, private userService: UserService) { }

  ngOnInit(): void {

    this.userService
      .onLogin(() => {
        this.api
          .getAllClinics()
          .pipe(tap(console.log))
          .subscribe((value) => {
            this.setClinics(value)
            // this.clinics.forEach(this.getAllEvents)
          })
      })


  }
  setClinics(clinics: FullClinic[]) {
    this.clinics = clinics
  }

  getAllEvents(clinic: FullClinic) {
    let FourWeeksEvents = new Array<DayOfEvents>(24)

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
                    eventStart: new Date(scheduleEvent.finishTime),
                    employees: schedule.employees
                  })
                  if (schedule.employees.length) console.log(schedule.employees);

                }
              })
          })

        }
      })
    // console.table(FourWeeksEvents);

    return FourWeeksEvents
  }


  private isWithInFourWeeks(dateStart: number | string, dateEnd: number | string) {
    let weeksStart = moment().startOf('week')
    let weeksEnd = moment().add(4, 'week')

    return moment(dateStart).isBetween(weeksStart, weeksEnd) || moment(dateEnd).isBetween(weeksStart, weeksEnd);
  }

}


