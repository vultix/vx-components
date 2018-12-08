import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxRadioButtonComponent} from './vx-radio-button.component';
import {VxRadioGroupComponent} from './vx-radio-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxRadioButtonComponent, VxRadioGroupComponent],
  exports: [VxRadioButtonComponent, VxRadioGroupComponent]
})
export class VxRadioModule {

}
