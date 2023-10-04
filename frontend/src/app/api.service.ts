import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, map, scheduled, throwError } from 'rxjs'; // don't forget this, or you'll get a runtime error
import { BuildingDto } from './dto/BuildingDto';
import { ClinicDto } from './dto/ClinicDto';
import { EmployeeDto } from './dto/EmployeeDto';
import { HospitalDto } from './dto/HospitalDto';
import Logger from './logger.service';
import { UserService } from './user.service';
import { FullClinic } from './models/FullClinic';
import moment from 'moment';
import { ClinicScheduleDto } from './dto/ClinicScheduleDto';

interface CRUD<T, ID> {
  getAll(): Observable<T[]>,
  save(entity: T): Observable<T>,
  delete(id: ID): void,
  update(id: ID, entity: T): Observable<T>,
}
class crudAPI<T, ID> implements CRUD<T, ID> {
  _http: HttpClient
  constructor(private url: string, private headers: HttpHeaders) {
    this._http = inject(HttpClient)
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.url, { headers: this.headers })
  }
  save(entity: T): Observable<T> {
    return this._http.post<T>(this.url, entity)
  }
  delete(id: ID): void {
    this._http.delete(this.url + `/${id}`)
  }
  update(id: ID, entity: T): Observable<T> {
    return this._http.put<T>(this.url + `/${id}`, entity)
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
  hospitalDataSource = new crudAPI<HospitalDto, number>(this.HOSPITAL_URI, this.AuthHeader())

  private readonly BUILDING_URI = this.url("/private/hospital")
  buildingDataSource = new crudAPI<BuildingDto, number>(this.BUILDING_URI, this.AuthHeader());


  private readonly CLINIC_URI = this.url('/private/clinic')
  clinicDataSource = new crudAPI<ClinicDto, number>(this.CLINIC_URI, this.AuthHeader());

  private readonly EMPLOYEE_URI = this.url('/private/clinic')
  employeeDataSource = new crudAPI<EmployeeDto, number>(this.EMPLOYEE_URI, this.AuthHeader());

  private convertDateFromStringToMs = (str: string | number) => {
    return new Date(str).getTime()
  }
  getFullClinic(id: number) {
    return this.http.get<FullClinic>
      (`http://localhost:8080/public/full-clinic${'/' + id}`, { headers: {} })
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
      (`http://localhost:8080/public/full-clinic`, { headers: {} })
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
    let basicAuth = "";
    let Headers = new HttpHeaders();

    this.user.getCurrentUser()
      .pipe(
        map(loginData => `${loginData.username}:${loginData.password}`))
      .subscribe(value => {
        basicAuth = value
      }).unsubscribe()
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
