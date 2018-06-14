import {NgModule} from '@angular/core';
import {VxCheckboxModule} from './checkbox';
import {VxInputModule} from './input';
import {VxMenuModule} from './menu';
import {VxAutocompleteModule} from './autocomplete';
import {VxTabsModule} from './tabs';
import {VxDialogModule} from './dialog';
import {VxRadioModule} from './radio';
import {VxToastModule} from './toast';
import {VxStepperModule} from './stepper';
import {VxSpinnerModule} from './spinner';
import {VxSlideToggleModule} from './slide-toggle';
import {VxSliderModule} from './slider';
import {VxButtonModule} from './button';
import {VxButtonGroupModule} from './button-group';

const MODULES = [VxCheckboxModule, VxInputModule, VxMenuModule,
  VxAutocompleteModule, VxTabsModule, VxDialogModule,
  VxRadioModule, VxToastModule, VxStepperModule,
  VxSpinnerModule, VxSlideToggleModule, VxSliderModule,
  VxButtonModule, VxButtonGroupModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class VxComponentsModule {
}
