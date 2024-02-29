import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserslistComponent } from './userslist/userslist.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AddaccountComponent } from './addaccount/addaccount.component';

const routes: Routes = [
  { path: 'add', component: AddaccountComponent },
  {
    path: '', component: UserslistComponent, children: [
      { path: 'details/:id', component: UserdetailsComponent },
      { path: '', redirectTo: '/admin/ut/user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
