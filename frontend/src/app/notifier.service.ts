import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
export type Notice = {
  type: 'ERROR' | 'INFO' | 'CONFIRM'
  message: string,
  details?: string[],
  action?: (() => void)
}
@Injectable({
  providedIn: 'root'
})
export class NotifierService implements OnDestroy {

  notificationsList: Notice[] = []
  notification$ = new BehaviorSubject<Notice[]>(this.notificationsList);
  constructor(private user: UserService) { }

  submitResponse = (ResponseData?: { nextLog?: string, completeLog?: string }) => {
    return {
      error: (err: any) => {
        this.error(err)
      }, next: (value: any) => {
        if (ResponseData?.nextLog)
          this.info(ResponseData.nextLog)
      }, complete: () => {
        if (ResponseData?.completeLog)
          this.info(ResponseData.completeLog)
        else
          this.info('Transaction Completed')

      }
    }
  }

  notify(notification: Notice) {
    this.notificationsList.push(notification)
    this.notification$.next(this.notificationsList)
  }
  info(text: string) {
    this.notificationsList.push({
      type: 'INFO',
      message: text
    })
    this.notification$.next(this.notificationsList)
  }

  error(error: Error) {
    const errorDerails = this.getErrorMessage(error);
    this.notificationsList.push({
      type: 'ERROR',
      message: errorDerails.message,
      details: errorDerails.details
    })
    this.notification$.next(this.notificationsList)
  }
  confirm(text: string, action: (() => void)) {
    this.notificationsList.push({
      type: 'CONFIRM',
      message: text,
      action: action
    })
    this.notification$.next(this.notificationsList)
  }
  dismissLast() {
    this.notificationsList.pop()
  }
  getNotifier() {
    return this.notification$.asObservable()
  }
  peekLastNotice() {
    return { ... this.notification$.value.at(-1) }
  }

  ngOnDestroy(): void {
    this.notification$.complete()
  }


  dismissLastWithAction() {
    let confirmationPassword = (document.getElementById('confirm-password') as HTMLInputElement).value
    if (this.user.getCurrentUser().value.password == confirmationPassword) {
      let last = this.notificationsList.pop()
      if (last?.action) {
        last.action()
      }
    }
  }

  private getErrorMessage(error: Error): { message: string, details?: string[] } {
    let message = "";
    let details = [""];


    if (error instanceof HttpErrorResponse) {
      message = error.error.message
      if (error.error.details) {
        details = error.error.details
      }
      else {
        message = error.error.message
        if (error.error.details) {
          details = error.error.details
        }
      }
    }
    else if (error instanceof ErrorEvent) {
      message = error.message
    } else message = error.message

    return { message, details: [... new Set(details)] }
  }
}
