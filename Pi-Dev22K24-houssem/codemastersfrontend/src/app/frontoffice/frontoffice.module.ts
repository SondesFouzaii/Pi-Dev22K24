import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeComponent } from './frontoffice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeHeaderComponent } from './frontoffice-header/frontoffice-header.component';
import { FrontofficeSidebarComponent } from './frontoffice-sidebar/frontoffice-sidebar.component';
import { FrontofficeFooterComponent } from './frontoffice-footer/frontoffice-footer.component';
import { AddPostComponentFront } from './PostFront/add-postfront/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPostComponent } from './PostFront/list-post/list-post.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModifyfrontPostComponent } from './PostFront/modifyfront-post/modifyfront-post.component';



@NgModule({
  declarations: [
    FrontofficeComponent,
    HomepageComponent,
    FrontofficeHeaderComponent,
    FrontofficeSidebarComponent,
    FrontofficeFooterComponent,
    AddPostComponentFront,
    ListPostComponent,
    ModifyfrontPostComponent,
 
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    MatMenuModule
   
  ]
})
export class FrontofficeModule { }
