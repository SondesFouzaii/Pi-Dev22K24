import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './Back office/back.component';
import { FooterComponent } from './Back office/footer/footer.component';
import { HeaderComponent } from './Back office/header/header.component';
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
import { RouterLink } from '@angular/router';
import { ResetComponent } from './reset/reset.component';
import { VheaderComponent } from './Back office/vheader/vheader.component';
import {enableProdMode} from '@angular/core';


enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FooterComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    NotfoundComponent,
    ResetComponent,
    VheaderComponent
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
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
