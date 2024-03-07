import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardmainComponent } from './cardmain.component';
import { PokercardsRoutingModule } from './pokercards-routing.module';
import { HomecardComponent } from './homecard/homecard.component';
import { CardshowComponent } from './cardshow/cardshow.component';

@NgModule({
  declarations: [
    CardmainComponent,
    HomecardComponent,
    CardshowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PokercardsRoutingModule
  ]
})
export class PokercardsModule { }
