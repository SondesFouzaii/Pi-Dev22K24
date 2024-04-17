import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { SprintListComponent } from './Sprint/sprint-list/sprint-list.component';
import { SprintDetailsComponent } from './sprint/sprint-details/sprint-details.component';
import { AddPostComponentFront } from './PostFront/add-postfront/add-post.component';
import { ListPostComponent } from './PostFront/list-post/list-post.component';
import { ModifyfrontPostComponent } from './PostFront/modifyfront-post/modifyfront-post.component';
import { UpdateCommentComponent } from './Commentfront/update-comment/update-comment.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    {path: 'task/task-list',component: TaskListComponent},
    {path: 'sprint/sprint-list',component: SprintListComponent},
    {path: 'sprint/sprint-details/:id',component: SprintDetailsComponent},
    {path: 'add-postfront', component: AddPostComponentFront},
    {path: 'show-list', component: ListPostComponent},
    {path: 'modify-postfront/:postId', component: ModifyfrontPostComponent},
     {path: 'update-comment/:commentId', component: UpdateCommentComponent}



  


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
