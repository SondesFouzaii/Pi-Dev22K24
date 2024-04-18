import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeComponent } from './frontoffice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeHeaderComponent } from './frontoffice-header/frontoffice-header.component';
import { FrontofficeSidebarComponent } from './frontoffice-sidebar/frontoffice-sidebar.component';
import { FrontofficeFooterComponent } from './frontoffice-footer/frontoffice-footer.component';
import { ListClaimComponent } from './claim/list-claim/list-claim.component';
import { ClaimAddComponent } from './claim/claim-add/claim-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClaimUpdateComponent } from './claim/claim-update/claim-update.component';
import { ListTeamComponent } from './team/list-team/list-team.component';
import { TeamCalendarComponent } from './team-calendar/team-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Make sure the import is correct
import dayGridPlugin from '@fullcalendar/daygrid';
import { TeamComponent } from './team/team/team.component';





@NgModule({
  declarations: [
    FrontofficeComponent,
    HomepageComponent,
    FrontofficeHeaderComponent,
    FrontofficeSidebarComponent,
    FrontofficeFooterComponent,
    ListClaimComponent,
    ClaimAddComponent,
    ClaimUpdateComponent,
    ListTeamComponent,
    TeamCalendarComponent,
    TeamComponent
    
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FrontofficeRoutingModule,
    FullCalendarModule
  ]
})
export class FrontofficeModule { }
