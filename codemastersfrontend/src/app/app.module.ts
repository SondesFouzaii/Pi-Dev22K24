import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackofficeModule } from './backoffice/backoffice.module';
import { FrontofficeModule } from './frontoffice/frontoffice.module';
import { FrontofficeRoutingModule } from './frontoffice/frontoffice-routing.module';
import { BackofficeRoutingModule } from './backoffice/backoffice-routing.module';
import { NotfoundComponent } from './Main/notfound/notfound.component';
import { ResetComponent } from './Main/reset/reset.component';
import { SigninComponent } from './Main/signin/signin.component';
import { SignupComponent } from './Main/signup/signup.component';
import { VerifComponent } from './Main/verif/verif.component';
import { WelcomeComponent } from './Main/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { SignincardComponent } from './Main/signincard/signincard.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';




@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    ResetComponent,
    SigninComponent,
    SignupComponent,
    VerifComponent,
    WelcomeComponent,
    SignincardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule,
    FrontofficeModule,
    FrontofficeRoutingModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule ,
    MatToolbarModule,
    MatDialogModule,
    PickerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
