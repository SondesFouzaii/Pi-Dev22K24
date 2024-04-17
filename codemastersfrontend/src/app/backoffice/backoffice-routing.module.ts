import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AddPostComponent } from './Post/add-post/add-post.component';
import { ShowPostComponent } from './Post/show-post/show-post.component';
import { ModifyPostComponent } from './Post/modify-post/modify-post.component';
import { PostOfUserComponent } from './Post/post-of-user/post-of-user.component';
import { ShowCommentComponent } from './Comment/show-comment/show-comment.component';



const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    {path: 'add-post', component: AddPostComponent},
    {path: 'show-post', component: ShowPostComponent},
    {path: 'show-posts', component: ShowPostComponent},
    {path: 'modify-post', component: ModifyPostComponent},
    {path: 'modify-post/:postId', component: ModifyPostComponent},
    {path: 'UserPosts', component: PostOfUserComponent},
    {path: 'showComment', component: ShowCommentComponent},

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
