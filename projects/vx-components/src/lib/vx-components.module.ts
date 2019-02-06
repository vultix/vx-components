import { NgModule } from '@angular/core';
import { VxAutocompleteModule } from './autocomplete';
import { VxButtonModule } from './button';
import { VxCheckboxModule } from './checkbox';
import { VxFormFieldModule } from './form-field';
import { VxMenuModule } from './menu';
import { VxPagerModule } from './pager';
import { VxRadioModule } from './radio';
import { VxTabsModule } from './tabs';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule,
    VxButtonModule, VxPagerModule, VxTabsModule, VxCheckboxModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule,
    VxButtonModule, VxPagerModule, VxTabsModule, VxCheckboxModule]
})
export class VxComponentsModule {

}
