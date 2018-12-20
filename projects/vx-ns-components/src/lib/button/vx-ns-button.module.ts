import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VxNsButtonComponent } from './vx-ns-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsButtonComponent],
  exports: [VxNsButtonComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VxNsButtonModule {

}
