import {NgModule} from '@angular/core';
import {CheckboxModule} from './checkbox/checkbox.module';
import {InputModule} from './input/input.module';
import {DropdownModule} from './dropdown/dropdown.module';
import {AutocompleteModule} from './autocomplete/autocomplete.module';
import {TabsModule} from './tabs/tabs.module';

const MODULES = [CheckboxModule, InputModule, DropdownModule, AutocompleteModule, TabsModule];

@NgModule({
  imports: MODULES,
  declarations: [],
  exports: MODULES
})
export class VxComponentsModule {
}
