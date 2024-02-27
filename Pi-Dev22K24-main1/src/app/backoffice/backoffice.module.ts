import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from './backoffice.component';
import { BackofficeHeaderComponent } from './backoffice-header/backoffice-header.component';
import { BackofficeFooterComponent } from './backoffice-footer/backoffice-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FrontofficeRoutingModule } from '../frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeNavbarComponent } from './backoffice-navbar/backoffice-navbar.component';
import { BackofficeSidebarComponent } from './backoffice-sidebar/backoffice-sidebar.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ShowSessionsComponent } from './session/show-sessions/show-sessions.component';
import { AddSessionComponent } from './session/add-session/add-session.component';
import { DetailsSessionComponent } from './session/details-session/details-session.component';
import { EditSessionComponent } from './session/edit-session/edit-session.component';
import { DeleteSessionComponent } from './session/delete-session/delete-session.component';



@NgModule({
  declarations: [
    BackofficeComponent,
    BackofficeHeaderComponent,
    BackofficeFooterComponent,
    BackofficeNavbarComponent,
    BackofficeSidebarComponent,
    BlankPageComponent,
    ShowSessionsComponent,
    AddSessionComponent,
    DetailsSessionComponent,
    EditSessionComponent,
    DeleteSessionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeRoutingModule
  ],
  exports: [
    BackofficeComponent
  ]
})
export class BackofficeModule { }
