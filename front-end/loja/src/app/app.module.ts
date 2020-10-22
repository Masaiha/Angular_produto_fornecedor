import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
