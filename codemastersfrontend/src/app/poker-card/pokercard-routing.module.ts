import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardmainComponent } from './cardmain.component';
import { HomecardComponent } from './homecard/homecard.component';
import { CardshowComponent } from './cardshow/cardshow.component';
const routes: Routes = [
  { path: 'blank', component:CardmainComponent , children: [
    {path: 'homecard',component: HomecardComponent},
    {path: 'card/showcard/:taskId',component: CardshowComponent}
   


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokercardsRoutingModule { }