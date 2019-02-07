import { NgModule } from '@angular/core';
import { VxAutocompleteModule } from './autocomplete';
import { VxButtonModule } from './button';
import { VxCheckboxModule } from './checkbox';
import { VxFormFieldModule } from './form-field';
import { VxMenuModule } from './menu';
import { VxPagerModule } from './pager';
import { VxRadioModule } from './radio';
import { VxStepperModule } from './stepper';
import { VxTabsModule } from './tabs';
import { VxVerticalExpanderModule } from './vertical-expander';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule,
    VxButtonModule, VxPagerModule, VxTabsModule, VxCheckboxModule, VxStepperModule, VxVerticalExpanderModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule,
    VxButtonModule, VxPagerModule, VxTabsModule, VxCheckboxModule, VxStepperModule, VxVerticalExpanderModule]
})
export class VxComponentsModule {

}
