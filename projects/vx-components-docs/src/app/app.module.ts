import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { VxComponentsModule } from 'vx-components';
import { VxSliderComponent } from '../../../vx-components/src/lib/slider/vx-slider.component';
import { VxSliderModule } from '../../../vx-components/src/lib/slider/vx-slider.module';

import { AppComponent } from './app.component';
import { VxAutocompleteDocsComponent } from './autocomplete-docs/vx-autocomplete-docs.component';
import { VxButtonDocsComponent } from './button-docs/vx-button-docs.component';
import { VxCheckboxDocsComponent } from './checkbox-docs/vx-checkbox-docs.component';
import { AnimalDialogComponent } from './dialog-docs/animal-dialog.component';
import { VxDialogDocsComponent } from './dialog-docs/vx-dialog-docs.component';
import { VxFormFieldDocsComponent } from './form-field-docs/vx-form-field-docs.component';
import { VxMenuDocsComponent } from './menu-docs/vx-menu-docs.component';
import { VxPagerDocsComponent } from './pager-docs/vx-pager-docs.component';
import { VxRadioDocsComponent } from './radio-docs/vx-radio-docs.component';
import { VxSliderDocsComponent } from './slider-docs/vx-slider-docs.component';
import { VxSpinnerDocsComponent } from './spinner-docs/vx-spinner-docs.component';
import { VxStepperDocsComponent } from './stepper-docs/vx-stepper-docs.component';
import { VxTabsDocsComponent } from './tabs-docs/vx-tabs-docs.component';
import { TitleService } from './title.service';
import { VxVerticalExpanderDocsComponent } from './vertical-expander-docs/vx-vertical-expander-docs.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form-field'},
  {path: 'form-field', component: VxFormFieldDocsComponent},
  {path: 'radio', component: VxRadioDocsComponent},
  {path: 'menu', component: VxMenuDocsComponent},
  {path: 'autocomplete', component: VxAutocompleteDocsComponent},
  {path: 'button', component: VxButtonDocsComponent},
  {path: 'pager', component: VxPagerDocsComponent},
  {path: 'tabs', component: VxTabsDocsComponent},
  {path: 'checkbox', component: VxCheckboxDocsComponent},
  {path: 'stepper', component: VxStepperDocsComponent},
  {path: 'vertical-expander', component: VxVerticalExpanderDocsComponent},
  {path: 'dialog', component: VxDialogDocsComponent},
  {path: 'spinner', component: VxSpinnerDocsComponent},
  {path: 'slider', component: VxSliderDocsComponent}
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
    VxTabsDocsComponent,
    VxCheckboxDocsComponent,
    VxStepperDocsComponent,
    VxVerticalExpanderDocsComponent,
    VxDialogDocsComponent,
    AnimalDialogComponent,
    VxSpinnerDocsComponent,
    VxSliderDocsComponent
  ],
  entryComponents: [
    AnimalDialogComponent
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
