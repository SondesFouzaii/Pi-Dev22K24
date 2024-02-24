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



@NgModule({
  declarations: [
    BackofficeComponent,
    BackofficeHeaderComponent,
    BackofficeFooterComponent,
    BackofficeNavbarComponent,
    BackofficeSidebarComponent,
    BlankPageComponent
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
