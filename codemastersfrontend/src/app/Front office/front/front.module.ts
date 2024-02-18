import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { FrontdashboardComponent } from '../frontdashboard/frontdashboard.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { FrontComponent } from './front.component';


@NgModule({
  declarations: [
    FrontComponent,
    FrontdashboardComponent,
    FrontheaderComponent,
    FrontfooterComponent,
    MyprofileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class FrontModule { }
