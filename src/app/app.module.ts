import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzPageHeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
