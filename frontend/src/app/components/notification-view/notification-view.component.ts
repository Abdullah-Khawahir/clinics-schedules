import { Component } from '@angular/core';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})
export class NotificationViewComponent {
  notificationSource = this.notifierService
    .getNotifier();
  constructor(public notifierService: NotifierService) { }





}
