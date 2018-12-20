import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxAutocompleteComponent} from './vx-autocomplete.component';
import {VxItemComponent, VxMenuModule} from '../menu';
import {VxFormFieldModule} from '../form-field';

@NgModule({
  imports: [CommonModule, VxMenuModule, VxFormFieldModule],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {

}
