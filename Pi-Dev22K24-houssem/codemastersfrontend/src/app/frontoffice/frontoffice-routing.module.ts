import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { AddPostComponentFront } from './PostFront/add-postfront/add-post.component';
import { ListPostComponent } from './PostFront/list-post/list-post.component';
import { ModifyfrontPostComponent } from './PostFront/modifyfront-post/modifyfront-post.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    { path: 'add-postfront', component: AddPostComponentFront },
    { path: 'show-list', component: ListPostComponent },
    { path: 'modify-postfront', component: ModifyfrontPostComponent }
    


  


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
