import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './Back office/back/back.component';
import { FooterComponent } from './Back office/back/footer/footer.component';
import { HeaderComponent } from './Back office/back/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './Back office/dashboard/dashboard.component';
import { UsersComponent } from './Back office/users/users.component';
import { UserdetailsComponent } from './Back office/userdetails/userdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FooterComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
