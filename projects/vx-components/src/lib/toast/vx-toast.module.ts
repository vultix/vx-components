import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxVerticalExpanderModule } from '../vertical-expander/vx-vertical-expander.module';

import { VxToastComponent } from './vx-toast.component';
import { VxToast } from './vx-toast.service';

@NgModule({
  imports: [CommonModule, VxVerticalExpanderModule],
  declarations: [VxToastComponent],
  entryComponents: [VxToastComponent],
  providers: [VxToast]
})
export class VxToastModule {
}
