import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeComponent } from './frontoffice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeHeaderComponent } from './frontoffice-header/frontoffice-header.component';
import { FrontofficeSidebarComponent } from './frontoffice-sidebar/frontoffice-sidebar.component';
import { FrontofficeFooterComponent } from './frontoffice-footer/frontoffice-footer.component';
import { ListProjectFrontComponent } from './project/list-project-front/list-project-front.component';
import { AddProjectFrontComponent } from './project/add-project-front/add-project-front.component';
import { EditProjectFrontComponent } from './project/edit-project-front/edit-project-front.component';
import { DetaiLProjectFrontComponent } from './project/detai-lproject-front/detai-lproject-front.component';
import { ListUserstoryFrontComponent } from './userStory/list-userstory-front/list-userstory-front.component';
import { AddUserstoryFrontComponent } from './userStory/add-userstory-front/add-userstory-front.component';
import { EditUserstoryFrontComponent } from './userStory/edit-userstory-front/edit-userstory-front.component';
import { DetailUserstoryFrontComponent } from './userStory/detail-userstory-front/detail-userstory-front.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BackofficeRoutingModule } from '../backoffice/backoffice-routing.module';
import { CalendarProjectComponent } from './project/calendar-project/calendar-project.component';



@NgModule({
  declarations: [
    FrontofficeComponent,
    HomepageComponent,
    FrontofficeHeaderComponent,
    FrontofficeSidebarComponent,
    FrontofficeFooterComponent,
    ListProjectFrontComponent,
    AddProjectFrontComponent,
    EditProjectFrontComponent,
    DetaiLProjectFrontComponent,
    ListUserstoryFrontComponent,
    AddUserstoryFrontComponent,
    EditUserstoryFrontComponent,
    DetailUserstoryFrontComponent,
    CalendarProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
    ,FrontofficeRoutingModule
  ]
})
export class FrontofficeModule { }
