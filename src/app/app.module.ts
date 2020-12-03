import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouterModule } from './app-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NavigateComponent } from './navigate/navigate.component';
import { CardModule } from './card/card.module';

@NgModule({
  declarations: [AppComponent, NavigateComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
