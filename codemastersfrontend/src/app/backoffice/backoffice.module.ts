import { NgModule } from '@angular/core';
import { BackofficeComponent } from './backoffice.component';
import { BackofficeHeaderComponent } from './backoffice-header/backoffice-header.component';
import { BackofficeFooterComponent } from './backoffice-footer/backoffice-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FrontofficeRoutingModule } from '../frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeNavbarComponent } from './backoffice-navbar/backoffice-navbar.component';
import { BackofficeSidebarComponent } from './backoffice-sidebar/backoffice-sidebar.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AddPostComponent } from './Post/add-post/add-post.component';
import { ShowPostComponent } from './Post/show-post/show-post.component';
import { ModifyPostComponent } from './Post/modify-post/modify-post.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import { PostOfUserComponent } from './Post/post-of-user/post-of-user.component';

import { ToastrModule } from 'ngx-toastr';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowCommentComponent } from './Comment/show-comment/show-comment.component';




@NgModule({
  declarations: [
    BackofficeComponent,
    BackofficeHeaderComponent,
    BackofficeFooterComponent,
    BackofficeNavbarComponent,
    BackofficeSidebarComponent,
    BlankPageComponent,
    AddPostComponent,
    ShowPostComponent,
    ModifyPostComponent,
    PostOfUserComponent,
    ShowCommentComponent
   

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // HttpClientModule,
    BackofficeRoutingModule,
     // BrowserModule,
    // BrowserAnimationsModule,
    GridModule,
    ButtonsModule,
    DropDownsModule,
    MatPaginatorModule,
    BrowserAnimationsModule, // Import BrowserAnimationsModule
    ToastrModule.forRoot() // Configure ToastrModule

  ],
  exports: [
    BackofficeComponent,
    BackofficeHeaderComponent
  ]
})
export class BackofficeModule { }
