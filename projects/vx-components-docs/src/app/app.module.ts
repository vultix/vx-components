import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { VxComponentsModule } from 'vx-components';

import { AppComponent } from './app.component';
import { VxAutocompleteDocsComponent } from './autocomplete-docs/vx-autocomplete-docs.component';
import { VxButtonDocsComponent } from './button-docs/vx-button-docs.component';
import { VxFormFieldDocsComponent } from './form-field-docs/vx-form-field-docs.component';
import { VxMenuDocsComponent } from './menu-docs/vx-menu-docs.component';
import { VxPagerDocsComponent } from './pager-docs/vx-pager-docs.component';
import { VxRadioDocsComponent } from './radio-docs/vx-radio-docs.component';
import { VxTabsDemoComponent } from './tabs-docs/vx-tabs-demo.component';
import { TitleService } from './title.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form-field'},
  {path: 'form-field', component: VxFormFieldDocsComponent},
  {path: 'radio', component: VxRadioDocsComponent},
  {path: 'menu', component: VxMenuDocsComponent},
  {path: 'autocomplete', component: VxAutocompleteDocsComponent},
  {path: 'button', component: VxButtonDocsComponent},
  {path: 'pager', component: VxPagerDocsComponent},
  {path: 'tabs', component: VxTabsDemoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    VxFormFieldDocsComponent,
    VxRadioDocsComponent,
    VxMenuDocsComponent,
    VxAutocompleteDocsComponent,
    VxButtonDocsComponent,
    VxPagerDocsComponent,
    VxTabsDemoComponent
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
export class AppModule {
}
