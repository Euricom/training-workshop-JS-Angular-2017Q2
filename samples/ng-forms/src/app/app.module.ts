import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { AppComponent } from './app.component'
import { UserExistValidator } from './userExist.validator';

import './style.css'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // FormsModule,
    ReactiveFormsModule,
    NgxErrorsModule,
  ],
  providers: [
    UserExistValidator,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
