import { NgModule } from '@angular/core';
import { VxNsFormFieldModule } from './form-field';
import { VxNsMenuModule } from './menu/vx-ns-menu.module';
import { VxNsRadioModule } from './radio';

@NgModule({
  imports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule],
  exports: [VxNsFormFieldModule, VxNsRadioModule, VxNsMenuModule]
})
export class VxNsComponentsModule {

}
