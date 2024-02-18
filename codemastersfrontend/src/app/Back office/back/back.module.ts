import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserdetailsComponent
  ],
  imports: [
    CommonModule,
    BackRoutingModule
  ]
})
export class BackModule { }
