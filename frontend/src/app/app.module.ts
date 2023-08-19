import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestComponent } from './test/test.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { RemoveUserComponent } from './user-management/remove-user/remove-user.component';
import { UpdateUserComponent } from './user-management/update-user/update-user.component';
import { GetUserComponent } from './user-management/get-user/get-user.component';
import { UsersDashboardComponent } from './user-management/users-dashboard/users-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
    HomePageComponent,
    FooterComponent,
    LoginPageComponent,
    AddUserComponent,
    RemoveUserComponent,
    UpdateUserComponent,
    GetUserComponent,
    UsersDashboardComponent,
    AdminDashboardComponent,
    NotFoundPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
