import { Component } from '@angular/core';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  openHospitalForm = false;
  openBuildingForm = false;
  openClinicForm = false;
  openScheduleForm = false;
  openEmployeeForm = false;
  openUserForm = false;
  toggleAddHospitalForm() {
    this.openHospitalForm = !this.openHospitalForm
  }

  toggleAddBuildingForm() {
    this.openBuildingForm = !this.openBuildingForm
  }

  toggleAddClinicForm() {
    this.openClinicForm = !this.openClinicForm
  }


  toggleAddScheduleForm() {
    this.openScheduleForm = !this.openScheduleForm
  }


  toggleAddEmployeeForm() {
    this.openEmployeeForm = !this.openEmployeeForm
  }

  toggleAddUserForm() {
    this.openUserForm = !this.openUserForm
  }
}
