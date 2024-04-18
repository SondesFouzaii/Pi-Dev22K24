import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EditmyprofileComponent } from './editmyprofile/editmyprofile.component';
import { TeamateComponent } from './teamate/teamate.component';

const routes: Routes = [
  { path: 'profile/:code', component: ProfileComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'teamate/:id', component: TeamateComponent },
  { path: '', redirectTo: '/front/ut/user/myprofile', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
