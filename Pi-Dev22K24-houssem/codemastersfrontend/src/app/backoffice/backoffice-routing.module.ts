import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ShowPostComponent } from './Post/show-post/show-post.component';
import { AddPostComponent } from './Post/add-post/add-post.component';
import { ModifyPostComponent } from './Post/modify-post/modify-post.component';



const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    { path: 'add-post', component: AddPostComponent },
  { path: 'show-post', component: ShowPostComponent },
  { path: 'modify-post', component: ModifyPostComponent },
  { path: 'modify-post/:postId', component: ModifyPostComponent }
   

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
