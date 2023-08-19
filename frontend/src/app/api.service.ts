import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, map, throwError, retry, Observable } from 'rxjs'; // don't forget this, or you'll get a runtime error
import Logger from './logger.service';

type Test = number[];

@Injectable({
  providedIn: 'root'
})
export class API {
  static readonly SERVER_ADDRESS: string = "http://localhost:8080"
  
  private readonly MODELS = {
    TEST: `${API.SERVER_ADDRESS}/test`
  }

  constructor(private http: HttpClient) { }










  
  getTest(): Observable<number[]> {
    return this.http
      .get<number[]>(this.MODELS.TEST)
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
