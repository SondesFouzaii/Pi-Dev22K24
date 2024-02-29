import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
 
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', redirectTo: '/home/ut/user/profile/10', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
