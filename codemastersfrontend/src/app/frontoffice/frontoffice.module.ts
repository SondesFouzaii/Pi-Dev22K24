import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeComponent } from './frontoffice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeHeaderComponent } from './frontoffice-header/frontoffice-header.component';
import { FrontofficeSidebarComponent } from './frontoffice-sidebar/frontoffice-sidebar.component';
import { FrontofficeFooterComponent } from './frontoffice-footer/frontoffice-footer.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SprintListComponent } from './Sprint/sprint-list/sprint-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SprintDetailsComponent } from './sprint/sprint-details/sprint-details.component';
import { AddPostComponentFront } from './PostFront/add-postfront/add-post.component';
import { ListPostComponent } from './PostFront/list-post/list-post.component';
import { ModifyfrontPostComponent } from './PostFront/modifyfront-post/modifyfront-post.component';
import { RangePipe } from '../range.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateCommentComponent } from './Commentfront/update-comment/update-comment.component';




@NgModule({
  declarations: [
    FrontofficeComponent,
    HomepageComponent,
    FrontofficeHeaderComponent,
    FrontofficeSidebarComponent,
    FrontofficeFooterComponent,
    TaskListComponent,
    SprintListComponent,
    SprintDetailsComponent,
    AddPostComponentFront,
    ListPostComponent,
    ModifyfrontPostComponent,
    RangePipe,
    UpdateCommentComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule
  ]
})
export class FrontofficeModule { }
