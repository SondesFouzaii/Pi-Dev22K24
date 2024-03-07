import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { CardListComponent } from './Card/card-list/card-list.component';


const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    {path: 'cards',component: CardListComponent}

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
