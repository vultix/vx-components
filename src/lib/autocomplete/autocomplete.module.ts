import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxAutocompleteComponent} from './autocomplete.component';
import {VxInputModule} from '../input';
import {VxMenuModule, VxItemComponent} from '../menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VxInputModule,
    VxMenuModule
  ],
  declarations: [VxAutocompleteComponent],
  exports: [VxAutocompleteComponent, VxItemComponent]
})
export class VxAutocompleteModule {
}
