import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { InterfaceAccountModule } from './interface-account/interface-account.module';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/home.module';
import { LoadingModule } from './shared/components/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingModule,
    CoreModule,
    InterfaceAccountModule,
    HomeModule,
    InterfaceAccountModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
