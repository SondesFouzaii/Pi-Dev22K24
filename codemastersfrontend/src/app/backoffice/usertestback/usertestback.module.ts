import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertestbackRoutingModule } from './usertestback-routing.module';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    UsertestbackRoutingModule
  ]
})
export class UsertestbackModule { }
