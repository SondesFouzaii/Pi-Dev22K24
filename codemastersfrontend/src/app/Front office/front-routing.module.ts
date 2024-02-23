import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './front.component';
import { FrontdashboardComponent } from './frontdashboard/frontdashboard.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: FrontComponent, children: [
    {path: 'pokerplanning',component: FrontdashboardComponent},
    {path: 'myprofile',component: MyprofileComponent},
    {path: 'profile/:id',component: ProfileComponent},
    {path: '', redirectTo: '/home/pokerplanning', pathMatch: 'full'}
] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
