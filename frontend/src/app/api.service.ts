import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, catchError, map, take, throwError } from 'rxjs'; // don't forget this, or you'll get a runtime error
import { BuildingDto } from './dto/BuildingDto';
import { HospitalDto } from './dto/HospitalDto';
import { Employee } from './dto/employeeDto';
import Logger from './logger.service';
import { ClinicDto } from './dto/ClinicDto';
import { UserService } from './user.service';

interface CRUD<T, ID> {
  getAll(): Observable<T[]>,
  save(entity: T): Observable<T>,
  delete(id: ID): void,
  update(id: ID, entity: T): Observable<T>,
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
  hospitalDataSource: CRUD<HospitalDto, number> = {
    getAll: () => {
      return this.http.get<HospitalDto[]>(this.HOSPITAL_URI,
        { headers: this.AuthHeader(), responseType: "json" })
        .pipe(catchError(this.handleError));
    },
    save: (entity: HospitalDto) => {
      return this.http.post<HospitalDto>(this.HOSPITAL_URI, entity)
        .pipe(catchError(this.handleError))
    },
    delete: (id: number) => {
      return this.http.delete(this.HOSPITAL_URI + `/${id}`)
    },
    update: (id: number, entity: HospitalDto) => {
      return this.http.put<HospitalDto>(this.HOSPITAL_URI + `/${id}`, entity)
        .pipe(catchError(this.handleError))
    }
  }

  private readonly BUILDING_URI = this.url("/private/hospital")
  buildingDataSource: CRUD<BuildingDto, number> = {
    getAll: (): Observable<BuildingDto[]> => {
      return this.http.get<BuildingDto[]>(this.BUILDING_URI, { headers: this.AuthHeader() })

    },
    save: (entity: BuildingDto): Observable<BuildingDto> => {
      return this.http.post<BuildingDto>(this.BUILDING_URI, entity, { headers: this.AuthHeader() })
    },
    delete: (id: number): void => {
      this.http.delete<BuildingDto>(this.BUILDING_URI + `/${id}`, { headers: this.AuthHeader() })
    },
    update: (id: number, entity: BuildingDto): Observable<BuildingDto> => {
      return this.http.put<BuildingDto>(this.BUILDING_URI + `/${id}`, entity, { headers: this.AuthHeader() })
    }
  }

  private readonly CLINIC_URI = this.url('/private/clinic')
  clinicDataSource: CRUD<ClinicDto, number> = {
    getAll: (): Observable<ClinicDto[]> => {
      return this.http.get<ClinicDto[]>(this.CLINIC_URI, { headers: this.AuthHeader() })
    },
    save: (entity: ClinicDto): Observable<ClinicDto> => {
      return this.http.post<ClinicDto>(this.BUILDING_URI, entity, { headers: this.AuthHeader() })
    },
    delete: (id: number): void => {
      this.http.delete<ClinicDto>(this.BUILDING_URI + `/${id}`, { headers: this.AuthHeader() })
    },
    update: (id: number, entity: ClinicDto): Observable<ClinicDto> => {
      return this.http.put<ClinicDto>(this.BUILDING_URI + `/${id}`, entity, { headers: this.AuthHeader() })
    }
  }

  private readonly EMPLOYEE_URI = this.url('/private/clinic')
  employeeDataSource: CRUD<Employee, number> = {
    getAll: (): Observable<Employee[]> => {
      return this.http.get<Employee[]>(this.EMPLOYEE_URI, { headers: this.AuthHeader() })
    },
    save: (entity: Employee): Observable<Employee> => {
      return this.http.post<Employee>(this.EMPLOYEE_URI, entity, { headers: this.AuthHeader() })
    },
    delete: (id: number): void => {
      this.http.delete<Employee>(this.EMPLOYEE_URI + `/${id}`)
    },
    update: (id: number, entity: Employee): Observable<Employee> => {
      return this.http.put<Employee>(this.EMPLOYEE_URI + `/${id}`, entity, { headers: this.AuthHeader() })

    }
  }


  private AuthHeader() {
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
