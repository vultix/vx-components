import {NgModule} from '@angular/core';
import {VxFormFieldModule} from './form-field';
import {VxRadioModule} from './radio';
import {VxMenuModule} from './menu';
import {VxAutocompleteModule} from './autocomplete';

@NgModule({
  imports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule],
  exports: [VxFormFieldModule, VxRadioModule, VxMenuModule, VxAutocompleteModule]
})
export class VxComponentsModule {

}
