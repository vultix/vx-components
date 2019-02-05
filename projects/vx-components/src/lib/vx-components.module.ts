import { NgModule } from '@angular/core';
import { VxAutocompleteModule } from './autocomplete';
import { VxButtonModule } from './button';
import { VxFormFieldModule } from './form-field';
import { VxMenuModule } from './menu';
import { VxPagerModule } from './pager';
import { VxRadioModule } from './radio';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule, VxButtonModule, VxPagerModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule, VxButtonModule, VxPagerModule]
})
export class VxComponentsModule {

}
