import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SigninComponent } from './Main/signin/signin.component';
import { SignupComponent } from './Main/signup/signup.component';
import { ResetComponent } from './Main/reset/reset.component';
import { VerifComponent } from './Main/verif/verif.component';
import { WelcomeComponent } from './Main/welcome/welcome.component';
import { NotfoundComponent } from './Main/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ResetComponent,
    VerifComponent,
    WelcomeComponent,
    NotfoundComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
