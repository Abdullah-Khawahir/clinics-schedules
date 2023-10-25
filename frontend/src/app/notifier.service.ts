import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type Notice = {
  type: 'ERR' | 'INFO' | 'CONFIRM'
  message: string
  action?: (() => void)
}
@Injectable({
  providedIn: 'root'
})
export class NotifierService implements OnDestroy {

  notificationsList: Notice[] = []
  notification$ = new BehaviorSubject<Notice[]>(this.notificationsList);
  constructor() { }
  // notify()

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
  error(text: string) {
    this.notificationsList.push({
      type: 'ERR',
      message: text
    })
    this.notification$.next(this.notificationsList)
  }
  confirm(text: string, action: (() => void)) {
    this.notificationsList.push({
      type:'CONFIRM',
      message:text,
      action:action
    })
    this.notification$.next(this.notificationsList)
  }
  dismissLast() {
    this.notificationsList.pop()
  }
  getNotifier() {
    return this.notification$.asObservable()
  }
  ngOnDestroy(): void {
    this.notification$.complete()
  }

  dismissLastWithAction() {
    let last = this.notificationsList.pop()
    if (last?.action) {
      last.action()
    }

  }
}
