import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxCheckboxComponent} from './vx-checkbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxCheckboxComponent],
  exports: [VxCheckboxComponent]
})
export class CheckboxModule {
}
