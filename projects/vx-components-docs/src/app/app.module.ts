import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {VxComponentsModule} from 'vx-components';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {VxFormFieldDocsComponent} from './form-field-docs/vx-form-field-docs.component';
import {TitleService} from './title.service';
import {VxRadioDocsComponent} from './radio-docs/vx-radio-docs.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form-field'},
  {path: 'form-field', component: VxFormFieldDocsComponent},
  {path: 'radio', component: VxRadioDocsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    VxFormFieldDocsComponent,
    VxRadioDocsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    VxComponentsModule
  ],
  providers: [{provide: Title, useClass: TitleService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
