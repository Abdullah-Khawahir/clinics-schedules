import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AddActionComponent } from './actions/add-action/add-action.component';
import { EditActionComponent } from './actions/edit-action/edit-action.component';
import { RemoveActionComponent } from './actions/remove-action/remove-action.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DirectButtonComponent } from './components/direct-button/direct-button.component';
import { PopupFormComponent } from './components/popup-form/popup-form.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { BuildingFormComponent } from './forms/building-form/building-form.component';
import { ClinicFormComponent } from './forms/clinic-form/clinic-form.component';
import { EmployeeFormComponent } from './forms/employee-form/employee-form.component';
import { ScheduleFormComponent } from './forms/schedule-form/schedule-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { BuildingsPanelComponent } from './pages/authorized/buildings-panel/buildings-panel.component';
import { ClinicsPanelComponent } from './pages/authorized/clinics-panel/clinics-panel.component';
import { DashboardComponent } from './pages/authorized/dashboard/dashboard.component';
import { EmployeesPanelComponent } from './pages/authorized/employees-panel/employees-panel.component';
import { HospitalPanelComponent } from './pages/authorized/hospital-panel/hospital-panel.component';
import { LoginComponent } from './pages/public/auth/login/login.component';
import { RegisterComponent } from './pages/public/auth/register/register.component';
import { HospitalSchedulesComponent } from './pages/public/hospital-schedules/hospital-schedules.component';


import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HospitalFormComponent } from './forms/hospital-form/hospital-form.component';
import { SchedulesPanelComponent } from './pages/authorized/schedules-panel/schedules-panel.component';
import { UsersPanelComponent } from './pages/authorized/users-panel/users-panel.component';
import { HomeComponent } from './pages/public/home/home.component';
import { NotificationViewComponent } from './components/notification-view/notification-view.component';
@NgModule({
  declarations: [
    AppComponent,
    PopupFormComponent,
    SubmitButtonComponent,
    DirectButtonComponent,
    DataTableComponent,
    BuildingFormComponent,
    UserFormComponent,
    ClinicFormComponent,
    ScheduleFormComponent,
    EmployeeFormComponent,
    AddActionComponent,
    RemoveActionComponent,
    EditActionComponent,
    LoginComponent,
    RegisterComponent,
    HospitalSchedulesComponent,
    DashboardComponent,
    EmployeesPanelComponent,
    HospitalPanelComponent,
    BuildingsPanelComponent,
    ClinicsPanelComponent,
    NavbarComponent,
    HospitalFormComponent,
    SchedulesPanelComponent,
    HomeComponent,
    UsersPanelComponent,
    NotificationViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MomentModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
