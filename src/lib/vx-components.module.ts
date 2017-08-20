import {NgModule} from '@angular/core';
import {CheckboxModule} from './checkbox/checkbox.module';
import {VxInputModule} from './input/input.module';
import {VxDropdownModule} from './dropdown/dropdown.module';
import {VxAutocompleteModule} from './autocomplete/autocomplete.module';
import {VxTabsModule} from './tabs/tabs.module';
import {VxDialogModule} from './dialog/dialog.module';

const MODULES = [CheckboxModule, VxInputModule, VxDropdownModule, VxAutocompleteModule, VxTabsModule, VxDialogModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class VxComponentsModule {
}
