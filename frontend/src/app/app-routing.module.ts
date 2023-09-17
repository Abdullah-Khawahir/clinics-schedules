import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { HospitalSchedulesComponent } from './pages/public/hospital-schedules/hospital-schedules.component';
import { LoginComponent } from './pages/public/auth/login/login.component';



export const routes: Routes = [
  { path: "", title: "home", component: HomeComponent },
  { path: "login", title: "login", component: LoginComponent },
  { path: "hospital-schedules", title: "schedules", component: HospitalSchedulesComponent },
  { path: "**", redirectTo: "" },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
