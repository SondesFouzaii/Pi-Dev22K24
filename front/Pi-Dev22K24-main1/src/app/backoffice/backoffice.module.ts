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
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectDeleteComponent } from './project/project-delete/project-delete.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { AddUserstoryComponent } from './userStory/add-userstory/add-userstory.component';
import { ListUserstoryComponent } from './userStory/list-userstory/list-userstory.component';
import { DetailUserstoryComponent } from './userStory/detail-userstory/detail-userstory.component';
import { EditUserstoryComponent } from './userStory/edit-userstory/edit-userstory.component';



@NgModule({
  declarations: [
    BackofficeComponent,
    BackofficeHeaderComponent,
    BackofficeFooterComponent,
    BackofficeNavbarComponent,
    BackofficeSidebarComponent,
    BlankPageComponent,
    ProjectAddComponent,
    ProjectDeleteComponent,
    ListProjectComponent,
    DetailProjectComponent,
    EditProjectComponent,
    AddUserstoryComponent,
    ListUserstoryComponent,
    DetailUserstoryComponent,
    EditUserstoryComponent
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
