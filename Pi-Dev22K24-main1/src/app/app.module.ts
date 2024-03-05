import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { BackofficeModule } from './backoffice/backoffice.module';
import { FrontofficeModule } from './frontoffice/frontoffice.module';
import { FrontofficeRoutingModule } from './frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice/backoffice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyDialogComponent } from './frontoffice/sessionfrontoffice/open-session/my-dialog/my-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    MyDialogComponent


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule,
    FrontofficeRoutingModule,
    BackofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,

    


  ],
  providers: [
    DatePipe,  
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
