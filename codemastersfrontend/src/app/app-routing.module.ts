import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamComponent } from './backoffice/team/add-team/add-team.component';
import { TeamListComponent } from './backoffice/team/team-list/team-list.component';
import { UpdateTeamComponent } from './backoffice/team/update-team/update-team.component';


const routes: Routes = [
  {path: 'back', loadChildren: () => import('./backoffice/backoffice.module').then((m)=> m.BackofficeModule)},
  {path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then((m)=> m.FrontofficeModule)}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
