import { Component } from '@angular/core';
import { API } from 'src/app/api.service';

@Component({
  selector: 'app-clinic-week-schedules-form',
  templateUrl: './clinic-week-schedules-form.component.html',
  styleUrls: ['./clinic-week-schedules-form.component.css']
})
export class ClinicWeekSchedulesFormComponent {
  employees$ = this.api.employeeDataSource.getAll();
  constructor(public api: API) { }
}
