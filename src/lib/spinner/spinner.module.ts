import {Input, NgModule} from '@angular/core';
import {VxRadioGroupComponent} from '../radio/radio-group.component';
import {CommonModule} from '@angular/common';
import {VxRadioButtonComponent} from '../radio/radio-button.component';
import {VxSpinnerComponent} from './spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxSpinnerComponent],
  exports: [VxSpinnerComponent]
})
export class VxSpinnerModule {
}
