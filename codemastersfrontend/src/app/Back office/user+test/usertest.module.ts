import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertestRoutingModule } from './usertest-routing.module';
import { UsertestComponent } from './usertest.component';


@NgModule({
  declarations: [
    UsertestComponent
  ],
  imports: [
    CommonModule,
    UsertestRoutingModule
  ]
})
export class UsertestModule { }
