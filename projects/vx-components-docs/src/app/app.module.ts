import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {VxComponentsModule} from 'vx-components';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {VxFormFieldDocsComponent} from './form-field-docs/vx-form-field-docs.component';
import {TitleService} from './title.service';
import {VxRadioDocsComponent} from './radio-docs/vx-radio-docs.component';
import {VxMenuDocsComponent} from './menu-docs/vx-menu-docs.component';
import {VxAutocompleteDocsComponent} from './autocomplete-docs/vx-autocomplete-docs.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form-field'},
  {path: 'form-field', component: VxFormFieldDocsComponent},
  {path: 'radio', component: VxRadioDocsComponent},
  {path: 'menu', component: VxMenuDocsComponent},
  {path: 'autocomplete', component: VxAutocompleteDocsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    VxFormFieldDocsComponent,
    VxRadioDocsComponent,
    VxMenuDocsComponent,
    VxAutocompleteDocsComponent
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
