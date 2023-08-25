import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [



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
