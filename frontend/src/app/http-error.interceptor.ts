import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorDetails } from './models/ErrorDetails';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if(error.error instanceof ErrorDetails){
          errorMsg = `Error : ${error.error.message} \n${error.error.details}`
        }
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }

        return throwError(() => new Error(errorMsg));

      }))

  }
}
