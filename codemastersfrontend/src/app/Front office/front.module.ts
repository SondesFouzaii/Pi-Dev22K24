import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { HeaderfrontComponent } from './headerfront/headerfront.component';
import { MainfrontComponent } from './dashboardfront/mainfront.component';
import { TestfrontComponent } from './testfront/testfront.component';


@NgModule({
  declarations: [ 
    FrontComponent,
    HeaderfrontComponent,
    MainfrontComponent,
    TestfrontComponent],
  imports: [
    CommonModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
