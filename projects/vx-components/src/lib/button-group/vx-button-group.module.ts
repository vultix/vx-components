import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxButtonModule } from '../button/vx-button.module';
import { VxButtonGroupComponent } from './vx-button-group.component';

@NgModule({
  imports: [CommonModule, VxButtonModule],
  declarations: [VxButtonGroupComponent],
  exports: [VxButtonGroupComponent, VxButtonModule]
})
export class VxButtonGroupModule {

}
