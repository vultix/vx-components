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
@NgModule({
  imports: [VxCheckboxModule],
  exports: [VxCheckboxModule]
})
export class CheckboxModule {
  constructor() {
    console.warn('You are importing the VxCheckboxComponent from CheckboxModule, which will be removed in future versions. ' +
      ' Import from VxCheckboxModule instead.')
  }
}
