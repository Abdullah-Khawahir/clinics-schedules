import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs'; // don't forget this, or you'll get a runtime error
import { UserDto } from './dto/userDto';
import Logger from './logger.service';



@Injectable({
  providedIn: 'root'
})
export class API {
  readonly SERVER_ADDRESS: string = "http://localhost:8080"



  constructor(private http: HttpClient) { }


  getClinics() {
    const basicAuth = "abdullah" + ':' + "4484";
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', 'Basic ' + btoa(basicAuth));

    return this.http.get<any>(this.SERVER_ADDRESS + '/private/clinic',
      { headers: Headers, responseType: 'json' },)

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
