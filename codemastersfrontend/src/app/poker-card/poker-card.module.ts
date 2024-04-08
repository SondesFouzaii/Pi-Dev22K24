import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardmainComponent } from './cardmain.component';
import { HomecardComponent } from './homecard/homecard.component';
import { CardshowComponent } from './cardshow/cardshow.component';
import { PokercardsRoutingModule} from './pokercard-routing.module';


@NgModule({
  declarations: [
    CardmainComponent,
    HomecardComponent,
    CardshowComponent
  ],
  imports: [
    CommonModule,
    PokercardsRoutingModule
  ]
})
export class PokerCardModule { }
