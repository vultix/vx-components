import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VxSpinnerComponent } from './vx-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxSpinnerComponent],
  exports: [VxSpinnerComponent],
})
export class VxSpinnerModule {
}
