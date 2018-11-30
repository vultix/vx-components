import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {VxComponentsModule} from 'vx-components';
import {FormsModule} from '@angular/forms';

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
