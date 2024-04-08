import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeComponent } from './frontoffice.component';
import { ChatComponent } from './chat/chat.component';
import { StartEstimateComponent } from './start-estimate/start-estimate.component';
// const routes: Routes = [
//   {
//     path: '',
//     component: FrontofficeComponent,
//     children: [
//       { path: 'dashboard', component: HomepageComponent },
//       {path: 'chat',component: ChatComponent},
//       { path: '', redirectTo: '/front/dashboard', pathMatch: 'full' },
      
      
//       {
//         path: 'ut',
//         loadChildren: () =>
//           import('./usertest/usertest.module').then((m) => m.UsertestModule),
//       },
//     ],
//   },
// ];
const routes: Routes = [
  { path: '', component:FrontofficeComponent , children: [
    {path: 'dashboard',component: HomepageComponent},
    {path: 'chat',component: ChatComponent},
    {path :'StartEstimateComponent',component:StartEstimateComponent},
    {
      path: 'ut',
      loadChildren: () =>
        import('./usertest/usertest.module').then((m) => m.UsertestModule),
    },


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontofficeRoutingModule {}
