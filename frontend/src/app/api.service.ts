import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, map, throwError } from 'rxjs';
import { BuildingDto } from './dto/BuildingDto';
import { ClinicDto } from './dto/ClinicDto';
import { ClinicScheduleDto } from './dto/ClinicScheduleDto';
import { EmployeeDto } from './dto/EmployeeDto';
import { HospitalDto } from './dto/HospitalDto';
import Logger from './logger.service';
import { FullClinic } from './models/FullClinic';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';
const DEFAULT_HEADERS = {
  'lang': 'us-en',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',

}
interface CRUD<T, ID> {
  getAll(): Observable<T[]>,
  save(entity: T): Observable<T>,
  delete(id: ID): void,
  update(id: ID, entity: T): Observable<T>,
}
class crudAPI<T, ID> implements CRUD<T, ID> {
  _http: HttpClient = inject(HttpClient)
  constructor(private url: string, private headers: HttpHeaders) { }
  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.url, {
      headers: this.headers, responseType: "json",
    })
  }
  save(entity: T): Observable<T> {
    return this._http.post<T>(this.url, entity, { headers: this.headers, responseType: "json", })
  }
  delete(id: ID) {
    return this._http.delete(this.url + `/${id}`, { headers: this.headers, responseType: 'json' })
  }
  update(id: ID, entity: T): Observable<T> {
    return this._http.put<T>(this.url + `/${id}`, entity, { headers: this.headers, responseType: "json", })
  }
}

@Injectable({
  providedIn: 'root'
})
export class API implements OnDestroy {
  readonly SERVER_ADDRESS: string = "http://localhost:8080"

  private unsubscribe$ = new Subject<void>()
  url(uri: string) {
    return `${this.SERVER_ADDRESS}${uri}`

  }

  constructor(private http: HttpClient, private user: UserService) { }


  private readonly HOSPITAL_URI = this.url("/private/hospital")
  readonly hospitalDataSource = new crudAPI<HospitalDto, number>(this.HOSPITAL_URI, this.AuthHeader())

  private readonly BUILDING_URI = this.url("/private/building")
  readonly buildingDataSource = new crudAPI<BuildingDto, number>(this.BUILDING_URI, this.AuthHeader());


  private readonly CLINIC_URI = this.url('/private/clinic')
  readonly clinicDataSource = new crudAPI<ClinicDto, number>(this.CLINIC_URI, this.AuthHeader());

  private readonly EMPLOYEE_URI = this.url('/private/employee')
  readonly employeeDataSource = new crudAPI<EmployeeDto, number>(this.EMPLOYEE_URI, this.AuthHeader());

  private readonly CLINIC_SCHEDULE_URI = this.url('/private/clinic-schedule')
  readonly clinicScheduleDataSource = new crudAPI<ClinicScheduleDto, number>(this.CLINIC_SCHEDULE_URI, this.AuthHeader());

  private readonly USER_URI = this.url('/private/user')
  readonly userDataSource = new crudAPI<UserDto, number>(this.USER_URI, this.AuthHeader());


  addEmployeesToScheduleByIds(scheduleId: number, employeesIds: number[]) {
    return this.http.post(this.url(`/private/schedule-employee-list/${scheduleId}`), employeesIds, { headers: this.AuthHeader(), })
  }

  deleteEmployeeListByScheduleId(scheduleId: number) {
    return this.http.delete<void>(this.url(`/private/schedule-employee-list/${scheduleId}`), { headers: this.AuthHeader(), })

  }
  deleteEmployeeFromListByScheduleIdAndEmployeeId(scheduleId: number, employeeId: number) {
    return this.http.delete<void>(this.url(`/private/schedule-employee-list/${scheduleId}/${employeeId}`), { headers: this.AuthHeader(), })
  }



  private convertDateFromStringToMs = (str: string | number) => {
    return new Date(str).getTime()
  }
  getFullClinic(id: number) {
    return this.http.get<FullClinic>
      (`http://localhost:8080/public/full-clinic${'/' + id}`, { headers: new HttpHeaders(DEFAULT_HEADERS) })
      .pipe(
        map(clinic => {
          clinic.schedules.forEach(schedule => {
            schedule.beginDate = this.convertDateFromStringToMs(schedule.beginDate)
            schedule.expireDate = this.convertDateFromStringToMs(schedule.expireDate)

            schedule.events.forEach(event => {
              event.beginTime = this.convertDateFromStringToMs(event.beginTime)
              event.finishTime = this.convertDateFromStringToMs(event.finishTime)
            })
          })
          return clinic;
        })
      )

  }

  getAllClinics() {
    return this.http.get<FullClinic[]>
      (`http://localhost:8080/public/full-clinic`, { headers: new HttpHeaders(DEFAULT_HEADERS) })
      .pipe(
        map(clinics => {
          clinics.forEach(clinic => clinic.schedules.forEach(schedule => {
            schedule.beginDate = this.convertDateFromStringToMs(schedule.beginDate)
            schedule.expireDate = this.convertDateFromStringToMs(schedule.expireDate)

            schedule.events.forEach(event => {
              event.beginTime = this.convertDateFromStringToMs(event.beginTime)
              event.finishTime = this.convertDateFromStringToMs(event.finishTime)
            })
          }))
          return clinics;
        })
      )
  }
  AuthHeader() {
    let Headers = new HttpHeaders(DEFAULT_HEADERS);
    let user = this.user.getCurrentUser().getValue();
    let basicAuth = `${user.username}:${user.password}`
    Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));

    return Headers;
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      Logger.error(`[HTTP-ERROR] an error accrued: ${error.message}`)
    }
    else {
      console.info(
        `[HTTP-ERROR] Backend returned code ${error.status} `);
      console.error(error.error);

    }
    return throwError(
      () => 'Something bad happened; please try again later.');
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
