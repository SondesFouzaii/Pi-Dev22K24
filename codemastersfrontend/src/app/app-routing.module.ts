import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallComponent } from './Main/call/call.component';
import { WelcomeComponent } from './Main/welcome/welcome.component';
import { SigninComponent } from './Main/signin/signin.component';
import { SignincardComponent } from './Main/signincard/signincard.component';
import { SignupComponent } from './Main/signup/signup.component';
import { ResetComponent } from './Main/reset/reset.component';
import { VerifComponent } from './Main/verif/verif.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './Main/notfound/notfound.component';
import { PokerCardModule } from './poker-card/poker-card.module';
import { FrontofficeModule } from './frontoffice/frontoffice.module';
import { BackofficeModule } from './backoffice/backoffice.module';
const routes: Routes = [
  { path: 'back', canActivate: [AuthGuard], loadChildren: () => import('./backoffice/backoffice.module').then((m) => m.BackofficeModule) },
  { path: 'front', canActivate: [AuthGuard], loadChildren: () => import('./frontoffice/frontoffice.module').then((m) => m.FrontofficeModule) },
  { path: 'card',  loadChildren: () => import('./poker-card/poker-card.module').then((m) => m.PokerCardModule) },
  { path: 'call/:room:/:id', component: CallComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signin2', component: SignincardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'verif', component: VerifComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
 // { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PokerCardModule,
    FrontofficeModule,
    BackofficeModule
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
