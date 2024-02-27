import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSessionsComponent } from './backoffice/session/show-sessions/show-sessions.component';
import { AddSessionComponent } from './backoffice/session/add-session/add-session.component';


const routes: Routes = [
  {path: 'back', loadChildren: () => import('./backoffice/backoffice.module').then((m)=> m.BackofficeModule)},
  {path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then((m)=> m.FrontofficeModule)},
  { path: 'show-sessions', component: ShowSessionsComponent },
  { path: 'add-sessions', component: AddSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
