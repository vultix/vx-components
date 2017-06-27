import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VxInputComponent} from './vx-input.component';
import {VxNumberSpinnerComponent} from './vx-number-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [VxInputComponent, VxNumberSpinnerComponent],
  exports: [VxInputComponent]
})
export class VxInputModule {
}
