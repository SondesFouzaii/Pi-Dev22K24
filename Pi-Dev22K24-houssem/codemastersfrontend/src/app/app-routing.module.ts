import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './backoffice/Post/add-post/add-post.component';
import { ShowPostComponent } from './backoffice/Post/show-post/show-post.component';
import { ModifyPostComponent } from './backoffice/Post/modify-post/modify-post.component';
import { AddPostComponentFront } from './frontoffice/PostFront/add-postfront/add-post.component';


const routes: Routes = [
  {path: 'back', loadChildren: () => import('./backoffice/backoffice.module').then((m)=> m.BackofficeModule)},
  {path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then((m)=> m.FrontofficeModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
