import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsertestbackComponent } from './usertestback.component';

const routes: Routes = [
  {
    path: '', component: UsertestbackComponent, children: [
      {path: 'user', loadChildren: () => import('./user/user.module').then((m)=> m.UserModule)},
      //{path: 'test', loadChildren: () => import('./test/test.module').then((m)=> m.TestModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsertestbackRoutingModule { }
