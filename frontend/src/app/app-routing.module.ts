import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersDashboardComponent } from './user-management/users-dashboard/users-dashboard.component';



const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "users", component: UsersDashboardComponent },
  { path: "**", component: NotFoundPageComponent }


]

// { path: "get-user", component: UpdateUserComponent },
// { path: "add-user", component: AddUserComponent },
// { path: "remove-user", component: RemoveUserComponent },
// { path: "update-user", component: UpdateUserComponent },

// path:"Rooms"
// path:"Hospitals"
// path:"Rooms"





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
