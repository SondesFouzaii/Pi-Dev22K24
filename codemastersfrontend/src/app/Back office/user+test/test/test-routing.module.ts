import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests/tests.component';
import { AddtestComponent } from './addtest/addtest.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { UsertestComponent } from './usertest/usertest.component';

const routes: Routes = [
  {
    path: '', component: TestsComponent, children: [
      { path: 'add', component: AddtestComponent },
      { path: 'details', component: TestdetailsComponent },
      { path: 'testpassed', component: UsertestComponent },
      { path: '', redirectTo: 'admin/ut/test/add', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
