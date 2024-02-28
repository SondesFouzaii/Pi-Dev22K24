import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { SprintListComponent } from './Sprint/sprint-list/sprint-list.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    {path: 'task/task-list',component: TaskListComponent},
    {path: 'sprint/sprint-list',component: SprintListComponent}



  


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
