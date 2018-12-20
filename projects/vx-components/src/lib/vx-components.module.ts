import { NgModule } from '@angular/core';
import { VxAutocompleteModule } from './autocomplete';
import { VxButtonModule } from './button';
import { VxFormFieldModule } from './form-field';
import { VxMenuModule } from './menu';
import { VxRadioModule } from './radio';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule, VxButtonModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule, VxButtonModule]
})
export class VxComponentsModule {

}
