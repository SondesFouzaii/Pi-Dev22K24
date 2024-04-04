import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { PassatestComponent } from './passatest/passatest.component';
import { AvailabletestsComponent } from './availabletests/availabletests.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TowerBlocksComponent } from './tower-blocks/tower-blocks.component';


@NgModule({
  declarations: [
    PassatestComponent,
    AvailabletestsComponent,
    TowerBlocksComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class TestModule { }
