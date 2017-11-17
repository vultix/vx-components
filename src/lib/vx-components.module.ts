import {NgModule} from '@angular/core';
import {VxCheckboxModule} from './checkbox';
import {VxInputModule} from './input';
import {VxDropdownModule} from './dropdown';
import {VxAutocompleteModule} from './autocomplete';
import {VxTabsModule} from './tabs';
import {VxDialog, VxDialogModule} from './dialog';
import {VxRadioModule} from './radio/radio.module';

const MODULES = [VxCheckboxModule, VxInputModule, VxDropdownModule, VxAutocompleteModule, VxTabsModule, VxDialogModule, VxRadioModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [VxDialog]
})
export class VxComponentsModule {
}
