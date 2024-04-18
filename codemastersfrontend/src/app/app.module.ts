import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { BackofficeModule } from './backoffice/backoffice.module';
import { FrontofficeModule } from './frontoffice/frontoffice.module';
import { FrontofficeRoutingModule } from './frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice/backoffice-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule,
    FrontofficeModule,
    FrontofficeRoutingModule,
    BackofficeRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
