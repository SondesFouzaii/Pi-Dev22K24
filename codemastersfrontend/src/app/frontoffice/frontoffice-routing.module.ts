import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { ListClaimComponent } from './claim/list-claim/list-claim.component';
import { ClaimAddComponent } from './claim/claim-add/claim-add.component';
import { ClaimUpdateComponent } from './claim/claim-update/claim-update.component';
import { ListTeamComponent } from './team/list-team/list-team.component';





const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    { path: 'front-add-claim', component: ClaimAddComponent },
    { path: 'front-update-claim/:id', component: ClaimUpdateComponent },
    { path: 'front-show-claim', component: ListClaimComponent },
    {path: 'front-show-team', component: ListTeamComponent}
     


 
  


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
