import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { UserdetailsComponent } from '../userdetails/userdetails.component';

const routes: Routes = [
  { path: '', component: BackComponent, children: [
      {path: 'dashboard',component: DashboardComponent},
      {path: 'users',component: UsersComponent},
      {path: 'user/:id',component: UserdetailsComponent}

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule { }
