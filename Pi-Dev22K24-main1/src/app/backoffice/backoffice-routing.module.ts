import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ShowSessionsComponent } from './session/show-sessions/show-sessions.component';
import { AddSessionComponent } from './session/add-session/add-session.component';
import { EditSessionComponent } from './session/edit-session/edit-session.component';
import { DeleteSessionComponent } from './session/delete-session/delete-session.component';



const routes: Routes = [
  { path: '', component:BackofficeComponent , children: [
    {path: 'dashboard',component: BlankPageComponent},
    { path: 'show-sessions', component: ShowSessionsComponent },
    { path: 'add-sessions', component: AddSessionComponent },
    { path: 'edit-session/:id', component: EditSessionComponent },
    { path: 'delete-session', component: DeleteSessionComponent }

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
