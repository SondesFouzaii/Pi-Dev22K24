import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { ListProjectFrontComponent } from './project/list-project-front/list-project-front.component';
import { AddProjectFrontComponent } from './project/add-project-front/add-project-front.component';
import { EditProjectFrontComponent } from './project/edit-project-front/edit-project-front.component';
import { DetaiLProjectFrontComponent } from './project/detai-lproject-front/detai-lproject-front.component';
import { ListUserstoryFrontComponent } from './userStory/list-userstory-front/list-userstory-front.component';
import { AddUserstoryFrontComponent } from './userStory/add-userstory-front/add-userstory-front.component';
import { EditUserstoryFrontComponent } from './userStory/edit-userstory-front/edit-userstory-front.component';
import { DetailUserstoryFrontComponent } from './userStory/detail-userstory-front/detail-userstory-front.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'listProjectFront',component: ListProjectFrontComponent},
    {path: 'AddProjectFront',component: AddProjectFrontComponent},
    {path: 'editProjectFront/:id',component: EditProjectFrontComponent},
    {path: 'detailProjectFront/:id',component: DetaiLProjectFrontComponent},
    {path: 'listUserstoryFront',component: ListUserstoryFrontComponent},
    {path: 'addUserstoryFront',component: AddUserstoryFrontComponent},
    {path: 'editUserstoryFront/:id',component: EditUserstoryFrontComponent},
    {path: 'detailUserstoryFront/:id',component: DetailUserstoryFrontComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
