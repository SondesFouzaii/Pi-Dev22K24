import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { ImportquizComponent } from './importquiz/importquiz.component';
import { GeneratequizComponent } from './generatequiz/generatequiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TestComponent, ImportquizComponent, GeneratequizComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class TestModule { }
