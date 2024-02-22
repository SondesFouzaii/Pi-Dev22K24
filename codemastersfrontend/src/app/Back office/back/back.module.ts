import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { VheaderComponent } from './vheader/vheader.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserdetailsComponent
  ],
  imports: [
    CommonModule,
    BackRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class BackModule { }
