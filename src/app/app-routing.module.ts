import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'back', loadChildren: () => import('./backoffice/backoffice.module').then((m)=> m.BackofficeModule)},
  {path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then((m)=> m.FrontofficeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
