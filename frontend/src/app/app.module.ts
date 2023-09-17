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
import { LoginComponent } from './pages/public/auth/login/login.component';
import { RegisterComponent } from './pages/public/auth/register/register.component';
import { HospitalSchedulesComponent } from './pages/public/hospital-schedules/hospital-schedules.component';
import { DashboardComponent } from './pages/authorized/dashboard/dashboard.component';
import { EmployeesPanelComponent } from './pages/authorized/employees-panel/employees-panel.component';
import { HospitalPanelComponent } from './pages/authorized/hospital-panel/hospital-panel.component';
import { BuildingsPanelComponent } from './pages/authorized/buildings-panel/buildings-panel.component';
import { ClinicsPanelComponent } from './pages/authorized/clinics-panel/clinics-panel.component';


import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
