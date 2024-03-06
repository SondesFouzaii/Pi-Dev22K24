import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { SessionComponent } from './sessionfrontoffice/session/session.component';
import { OpenSessionComponent } from './sessionfrontoffice/open-session/open-session.component';
import { CalendarComponent } from './sessionfrontoffice/calendar/calendar.component';



const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    { path: 'front-session', component: SessionComponent },
    { path: 'open-session/:sessionCode/:sessionName', component: OpenSessionComponent },
    { path: 'calendar', component: CalendarComponent }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }