import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs'; // don't forget this, or you'll get a runtime error
import { userDto } from './dto/userDto';
import Logger from './logger.service';



@Injectable({
  providedIn: 'root'
})
export class API {
  readonly SERVER_ADDRESS: string = "http://localhost:8080"



  constructor(private http: HttpClient) { }


  auth(user: userDto) {
    return this.http.post<userDto>(this.SERVER_ADDRESS + "/auth", JSON.stringify(user))
      .pipe(
        catchError(this.handleError)
      )
  }








  private getTest(): Observable<number[]> {
    return this.http
      .get<number[]>("")
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
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
