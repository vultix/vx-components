import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from './input.component';
import {NumberSpinnerComponent} from './number-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InputComponent, NumberSpinnerComponent],
  exports: [InputComponent]
})
export class InputModule {
}
