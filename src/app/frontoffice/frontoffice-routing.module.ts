import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent}


  


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
