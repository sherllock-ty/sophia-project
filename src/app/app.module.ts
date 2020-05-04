import { PagesModule } from './components/pages/pages.module';

import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxImgZoomModule } from 'ngx-img-zoom';

import { MainComponent } from './components/main/main.component';


import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { GestureConfig } from '@angular/material';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    MainComponent,

  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ShopModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImgZoomModule,
    PagesModule
  ],
  providers: [     {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: GestureConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
