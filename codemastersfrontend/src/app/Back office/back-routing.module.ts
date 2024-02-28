import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back.component';
import { MainComponent } from './dashboard/main.component';

const routes: Routes = [
  {
    path: '', component: BackComponent, children: [
      { path: 'dashboard', component: MainComponent },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule { }
