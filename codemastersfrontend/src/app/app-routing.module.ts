import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'back', loadChildren: () => import('./backoffice/backoffice.module').then((m)=> m.BackofficeModule)},
  {path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then((m)=> m.FrontofficeModule)},
  {path: 'card', loadChildren: () => import('./poker-card/poker-card.module').then((m)=> m.PokercardsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
