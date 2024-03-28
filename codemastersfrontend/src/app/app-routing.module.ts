import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallComponent } from './main/call/call.component';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { SigninComponent } from './main/signin/signin.component';
import { SignincardComponent } from './main/signincard/signincard.component';
import { SignupComponent } from './main/signup/signup.component';
import { ResetComponent } from './main/reset/reset.component';
import { VerifComponent } from './main/verif/verif.component';
import { NotfoundComponent } from './main/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'back', canActivate: [AuthGuard], loadChildren: () => import('./backoffice/backoffice.module').then((m) => m.BackofficeModule) },
  { path: 'front', canActivate: [AuthGuard], loadChildren: () => import('./frontoffice/frontoffice.module').then((m) => m.FrontofficeModule) },
  { path: 'call/:room', component: CallComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signin2', component: SignincardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'verif', component: VerifComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
