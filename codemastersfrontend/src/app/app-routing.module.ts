import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'login', component: SigninComponent},
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./Back office/back.module').then((m)=> m.BackModule)},
  {path: 'home', loadChildren: () => import('./Front office/front.module').then((m)=> m.FrontModule)},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
