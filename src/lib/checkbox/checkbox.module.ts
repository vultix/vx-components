import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxCheckboxComponent} from './checkbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxCheckboxComponent],
  exports: [VxCheckboxComponent]
})
export class VxCheckboxModule {
}

/*
  @deprecated, import from VxCheckboxModule instead
 */
export let CheckboxModule = VxCheckboxModule;
