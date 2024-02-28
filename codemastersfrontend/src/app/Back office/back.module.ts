import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './dashboard/main.component';
import { BackComponent } from './back.component';
import { Header2Component } from './header2/header2.component';


@NgModule({
  declarations: [
    BackComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    Header2Component
  ],
  imports: [
    CommonModule,
    BackRoutingModule
  ]
})
export class BackModule { }
