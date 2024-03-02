import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeComponent } from './frontoffice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeHeaderComponent } from './frontoffice-header/frontoffice-header.component';
import { FrontofficeSidebarComponent } from './frontoffice-sidebar/frontoffice-sidebar.component';
import { FrontofficeFooterComponent } from './frontoffice-footer/frontoffice-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SessionComponent } from './sessionfrontoffice/session/session.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FrontofficeComponent,
    HomepageComponent,
    FrontofficeHeaderComponent,
    FrontofficeSidebarComponent,
    FrontofficeFooterComponent,
    SessionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule,

  ]
})
export class FrontofficeModule { }