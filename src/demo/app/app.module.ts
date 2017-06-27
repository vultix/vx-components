import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {VxComponentsModule} from './lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VxComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
