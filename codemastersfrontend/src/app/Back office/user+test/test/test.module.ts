import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { UsertestComponent } from './usertest/usertest.component';
import { AddtestComponent } from './addtest/addtest.component';
import { TestsComponent } from './tests/tests.component';


@NgModule({
  declarations: [
    TestsComponent,
    AddtestComponent,
    UsertestComponent,
    TestdetailsComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
