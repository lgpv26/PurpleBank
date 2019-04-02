import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InterfaceAccountModule } from './interface-account/interface-account.module';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/home.module';
import { LoadingModule } from './shared/components/loading/loading.module';
import { DepositIntoAccountModule } from './deposit-into-account/deposit-into-account.module';
import { SendMoneyModule } from './send-money/send-money.module';
import { TransactionHistoryModule } from './transation-history/transaction-history.module';
import { ContactsModule } from './contacts/contacts.module';

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
    DepositIntoAccountModule,
    SendMoneyModule,
    TransactionHistoryModule,
    HomeModule,
    InterfaceAccountModule,
    ContactsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
