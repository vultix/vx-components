import { NgModule } from '@angular/core';
import { VxNsAutocompleteModule } from './autocomplete';
import { VxNsButtonModule } from './button';
import { VxNsFormFieldModule } from './form-field';
import { VxNsMenuModule } from './menu/vx-ns-menu.module';
import { VxNsRadioModule } from './radio';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule, VxNsButtonModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule, VxNsAutocompleteModule, VxNsButtonModule]
})
export class VxNsComponentsModule {

}
