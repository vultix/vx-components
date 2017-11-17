import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VxRadioGroupComponent} from './radio-group.component';
import {VxRadioButtonComponent} from './radio-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VxRadioGroupComponent, VxRadioButtonComponent],
  exports: [VxRadioGroupComponent, VxRadioButtonComponent]
})
export class VxRadioModule { }
