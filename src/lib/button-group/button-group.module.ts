import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VxButtonGroupComponent} from './button-group.component';
import {VxButtonModule} from '../button';

@NgModule({
  imports: [CommonModule, VxButtonModule],
  declarations: [VxButtonGroupComponent],
  exports: [VxButtonGroupComponent, VxButtonModule]
})
export class VxButtonGroupModule {

}
