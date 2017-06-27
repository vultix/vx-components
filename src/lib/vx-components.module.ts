import {NgModule} from '@angular/core';
import {CheckboxModule} from './vx-checkbox/vx-checkbox.module';
import {VxInputModule} from './vx-input/vx-input.module';
import {VxDropdownModule} from './vx-dropdown/vx-dropdown.module';
import {VxAutocompleteModule} from './vx-autocomplete/vx-autocomplete.module';
import {VxTabsModule} from './vx-tabs/vx-tabs.module';

const MODULES = [CheckboxModule, VxInputModule, VxDropdownModule, VxAutocompleteModule, VxTabsModule];

@NgModule({
  imports: MODULES,
  declarations: [],
  exports: MODULES
})
export class VxComponentsModule {
}
