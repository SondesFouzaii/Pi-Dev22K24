import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertestbackRoutingModule } from './usertestback-routing.module';
import { UsertestbackComponent } from './usertestback.component';


@NgModule({
  declarations: [
    UsertestbackComponent
  ],
  imports: [
    CommonModule,
    UsertestbackRoutingModule
  ]
})
export class UsertestbackModule { }
