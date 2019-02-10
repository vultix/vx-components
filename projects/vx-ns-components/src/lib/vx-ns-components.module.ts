import { NgModule } from '@angular/core';
import { VxNsAutocompleteModule } from './autocomplete/vx-ns-autocomplete.module';
import { VxNsButtonModule } from './button/vx-ns-button.module';
import { VxNsFormFieldModule } from './form-field/vx-ns-form-field.module';
import { VxNsMenuModule } from './menu/vx-ns-menu.module';
import { VxNsPagerModule } from './pager/vx-ns-pager.module';
import { VxNsRadioModule } from './radio/vx-ns-radio.module';
import { VxNsStepperModule } from './stepper/vx-ns-stepper.module';
import { VxNsVerticalExpanderModule } from './vertical-expander/vx-ns-vertical-expander.module';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule,
    VxNsButtonModule, VxNsPagerModule, VxNsVerticalExpanderModule, VxNsStepperModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule,
    VxNsButtonModule, VxNsPagerModule, VxNsVerticalExpanderModule, VxNsStepperModule]
})
export class VxNsComponentsModule {

}
