import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { BuildingsPanelComponent } from './pages/authorized/buildings-panel/buildings-panel.component';
import { ClinicsPanelComponent } from './pages/authorized/clinics-panel/clinics-panel.component';
import { DashboardComponent } from './pages/authorized/dashboard/dashboard.component';
import { EmployeesPanelComponent } from './pages/authorized/employees-panel/employees-panel.component';
import { HospitalPanelComponent } from './pages/authorized/hospital-panel/hospital-panel.component';
import { SchedulesPanelComponent } from './pages/authorized/schedules-panel/schedules-panel.component';
import { UsersPanelComponent } from './pages/authorized/users-panel/users-panel.component';
import { LoginComponent } from './pages/public/auth/login/login.component';
import { HomeComponent } from './pages/public/home/home.component';
import { HospitalSchedulesComponent } from './pages/public/hospital-schedules/hospital-schedules.component';

const authenticatedRoutes: Routes = [
  {
    path: "dashboard",
    title: "Dashboard",
    component: DashboardComponent,
    
  },
  {
    path: "dashboard/hospitals-panel",
    title: "Hospitals Panel",
    component: HospitalPanelComponent,

  },
  {
    path: "dashboard/buildings-panel",
    title: "Buildings Panel",
    component: BuildingsPanelComponent,

  }, {
    path: "dashboard/clinics-panel",
    title: "Clinics Panel",
    component: ClinicsPanelComponent,

  }, {
    path: "dashboard/schedules-panel",
    title: "Schedules Panel",
    component: SchedulesPanelComponent,

  }, {
    path: "dashboard/employees-panel",
    title: "Employees Panel",
    component: EmployeesPanelComponent,

  }, {
    path: "dashboard/users-panel",
    title: "Users Panel",
    component: UsersPanelComponent,

  },
].map((route: Route) => {
  return { ...route, canActivate: [authenticationGuard] }
})

const publicRoutes: Routes = [
  {
    path: "",
    title: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    title: "login",
    component: LoginComponent
  },
  {
    path: "hospital-schedules",
    title: "schedules",
    component: HospitalSchedulesComponent
  },
]
export const routes: Routes = [
  ...authenticatedRoutes,
  ...publicRoutes,

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
