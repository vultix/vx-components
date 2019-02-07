import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsVerticalExpanderComponent } from './vx-ns-vertical-expander.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsVerticalExpanderComponent],
  exports: [VxNsVerticalExpanderComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsVerticalExpanderModule {

}
