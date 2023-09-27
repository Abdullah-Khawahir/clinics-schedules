import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs'; // don't forget this, or you'll get a runtime error
import { HospitalDto } from './dto/HospitalDto';
import { UserDto } from './dto/UserDto';
import Logger from './logger.service';
import { BuildingDto } from './dto/BuildingDto';
import { Employee } from './dto/employeeDto';



@Injectable({
  providedIn: 'root'
})
export class API {
  readonly SERVER_ADDRESS: string = "http://localhost:8080"



  constructor(private http: HttpClient) {

  }

  getEmployees() {
    return this.http.get<Employee[]>(this.SERVER_ADDRESS + "/private/employee",
      { headers: this.AuthHeader(), responseType: "json" })
      .pipe(catchError(this.handleError))
  }


  getClinics() {
    let Headers = this.AuthHeader();

    return this.http.get<any>(this.SERVER_ADDRESS + '/private/clinic',
      { headers: Headers, responseType: 'json' },)

  }

  private AuthHeader() {
    const basicAuth = "abdullah" + ':' + "4484";
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));
    return Headers;
  }

  getHospitalsList(): Observable<HospitalDto[]> {
    return this.http.get<HospitalDto[]>(this.SERVER_ADDRESS + "/private/hospital",
      { headers: this.AuthHeader(), responseType: "json" })
      .pipe(catchError(this.handleError))
  }

  getBuildingsList(): Observable<BuildingDto[]> {
    return this.http.get<BuildingDto[]>(this.SERVER_ADDRESS + "/private/building",
      { headers: this.AuthHeader(), responseType: "json" })
      .pipe(catchError(this.handleError))
  }


  auth(user: UserDto) {
    console.log(user);

    return this.http.post<UserDto>(this.SERVER_ADDRESS + "/public/auth", user)
      .pipe(
        catchError(this.handleError),
      )
  }








  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      Logger.error(`[HTTP-ERROR] an error accrued: ${error.message}`)
    }
    else {
      console.error(
        `[HTTP-ERROR] Backend returned code ${error.status} `);
      console.error(error.error);

    }
    return throwError(
      () => 'Something bad happened; please try again later.');
  }





}
