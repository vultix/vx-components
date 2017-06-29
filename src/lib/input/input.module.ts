import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxInputWrapperComponent} from './input-wrapper.component';
import {VxInputDirective} from './vx-input.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [VxInputWrapperComponent, VxInputDirective],
  exports: [VxInputWrapperComponent, VxInputDirective]
})
export class VxInputModule {
}
