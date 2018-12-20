import { NgModule } from '@angular/core';
import { VxNsAutocompleteModule } from './autocomplete';
import { VxNsFormFieldModule } from './form-field';
import { VxNsMenuModule } from './menu/vx-ns-menu.module';
import { VxNsRadioModule } from './radio';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule]
})
export class VxNsComponentsModule {

}
