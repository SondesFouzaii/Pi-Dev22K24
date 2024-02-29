import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './front.component';
import { MainfrontComponent } from './dashboardfront/mainfront.component';
import { TestfrontComponent } from './testfront/testfront.component';

const routes: Routes = [
  {
    path: '', component: FrontComponent, children: [
      { path: 'pokerplanning', component: MainfrontComponent },
      {path: 'ut', loadChildren: () => import('./user+test/usertest.module').then((m)=> m.UsertestModule)},
      { path: 'test', component: TestfrontComponent },
      { path: '', redirectTo: '/home/pokerplanning', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
