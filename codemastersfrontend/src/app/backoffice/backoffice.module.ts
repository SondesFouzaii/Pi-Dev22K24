import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from './backoffice.component';
import { BackofficeHeaderComponent } from './backoffice-header/backoffice-header.component';
import { BackofficeFooterComponent } from './backoffice-footer/backoffice-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FrontofficeRoutingModule } from '../frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeNavbarComponent } from './backoffice-navbar/backoffice-navbar.component';
import { BackofficeSidebarComponent } from './backoffice-sidebar/backoffice-sidebar.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';
import { ClaimListComponent } from './Claim/claim-list/claim-list.component';
import { AddClaimComponent } from './Claim/add-claim/add-claim.component';
import { UpdateClaimComponent } from './Claim/update-claim/update-claim.component';
import { AddUsersToTeamComponent } from './team/add-users-to-team/add-users-to-team.component';
import { AddProjectsToTeamComponent } from './team/add-projects-to-team/add-projects-to-team.component';




@NgModule({
  declarations: [
    BackofficeComponent,
    BackofficeHeaderComponent,
    BackofficeFooterComponent,
    BackofficeNavbarComponent,
    BackofficeSidebarComponent,
    BlankPageComponent,
    AddTeamComponent,
    TeamListComponent,
    UpdateTeamComponent,
    ClaimListComponent,
    AddClaimComponent,
    UpdateClaimComponent,
    AddUsersToTeamComponent,
    AddProjectsToTeamComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeRoutingModule
  ],
  exports: [
    BackofficeComponent
  ]
})
export class BackofficeModule { }
