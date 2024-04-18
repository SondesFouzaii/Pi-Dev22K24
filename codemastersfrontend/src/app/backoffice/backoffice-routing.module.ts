import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';
import { ClaimListComponent } from './Claim/claim-list/claim-list.component';
import { AddClaimComponent } from './Claim/add-claim/add-claim.component';
import { UpdateClaimComponent } from './Claim/update-claim/update-claim.component';
import { AddUsersToTeamComponent } from './team/add-users-to-team/add-users-to-team.component';
import { AddProjectsToTeamComponent } from './team/add-projects-to-team/add-projects-to-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    { path: 'back-add-team', component: AddTeamComponent },
    { path: 'back-show-team', component: TeamListComponent },
    { path:  'back-update-team/:id', component: UpdateTeamComponent },
    { path: 'back-show-claim', component: ClaimListComponent },
    { path: 'back-add-claim', component: AddClaimComponent },
    { path: 'back-update-claim/:id', component: UpdateClaimComponent },
    { path: 'back-add-users-to-team/:teamId', component: AddUsersToTeamComponent },
    { path: 'back-add-projects-to-team/:teamId', component: AddProjectsToTeamComponent },
    { path: 'dashboard-team', component: DashboardComponent },
    { path: 'chart-team', component: ChartComponent }


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
