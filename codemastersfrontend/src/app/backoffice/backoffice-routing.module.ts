import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { DetailProjectComponent } from './project/detail-project/detail-project.component';
import { ListUserstoryComponent } from './userStory/list-userstory/list-userstory.component';
import { AddUserstoryComponent } from './userStory/add-userstory/add-userstory.component';
import { EditUserstoryComponent } from './userStory/edit-userstory/edit-userstory.component';
import { DetailUserstoryComponent } from './userStory/detail-userstory/detail-userstory.component';



const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    {path: 'listProject',component: ListProjectComponent},
    {path: 'addProject',component: ProjectAddComponent},
    {path: 'editProject/:id',component: EditProjectComponent},
    {path: 'detailProject/:id',component: DetailProjectComponent},
    {path: 'listUserstory',component: ListUserstoryComponent},
    {path: 'addUserstory',component: AddUserstoryComponent},
    {path: 'editUserstory/:id',component: EditUserstoryComponent},
    {path: 'detailUserstory/:id',component: DetailUserstoryComponent},

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
