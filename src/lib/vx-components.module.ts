import {NgModule} from '@angular/core';
import {CheckboxModule} from './checkbox';
import {VxInputModule} from './input';
import {VxDropdownModule} from './dropdown';
import {VxAutocompleteModule} from './autocomplete';
import {VxTabsModule} from './tabs';
import {VxDialogModule} from './dialog';

const MODULES = [CheckboxModule, VxInputModule, VxDropdownModule, VxAutocompleteModule, VxTabsModule, VxDialogModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class VxComponentsModule {
}
