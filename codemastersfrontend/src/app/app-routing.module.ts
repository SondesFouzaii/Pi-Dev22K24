import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Main/signin/signin.component';
import { NotfoundComponent } from './Main/notfound/notfound.component';
import { ResetComponent } from './Main/reset/reset.component';
import { SignupComponent } from './Main/signup/signup.component';
import { VerifComponent } from './Main/verif/verif.component';
import { WelcomeComponent } from './Main/welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'verif', component: VerifComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./Back office/back.module').then((m)=> m.BackModule)},
  {path: 'home', loadChildren: () => import('./Front office/front.module').then((m)=> m.FrontModule)},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
