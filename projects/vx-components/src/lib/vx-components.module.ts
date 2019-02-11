import { NgModule } from '@angular/core';
import { VxAutocompleteModule } from './autocomplete/vx-autocomplete.module';
import { VxButtonModule } from './button/vx-button.module';
import { VxCheckboxModule } from './checkbox/vx-checkbox.module';
import { VxDialogModule } from './dialog/vx-dialog.module';
import { VxFormFieldModule } from './form-field/vx-form-field.module';
import { VxMenuModule } from './menu/vx-menu.module';
import { VxPagerModule } from './pager/vx-pager.module';
import { VxRadioModule } from './radio/vx-radio.module';
import { VxSpinnerModule } from './spinner/vx-spinner.module';
import { VxStepperModule } from './stepper/vx-stepper.module';
import { VxTabsModule } from './tabs/vx-tabs.module';
import { VxVerticalExpanderModule } from './vertical-expander/vx-vertical-expander.module';

const modules = [
  VxFormFieldModule,
  VxRadioModule,
  VxMenuModule,
  VxAutocompleteModule,
  VxButtonModule,
  VxPagerModule,
  VxTabsModule,
  VxCheckboxModule,
  VxStepperModule,
  VxVerticalExpanderModule,
  VxDialogModule,
  VxSpinnerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class VxComponentsModule {

}
