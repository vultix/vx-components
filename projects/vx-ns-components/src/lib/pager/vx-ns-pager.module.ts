import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxNsPageComponent } from './vx-ns-page.component';
import { VxNsPagerNextDirective } from './vx-ns-pager-next.directive';
import { VxNsPagerPreviousDirective } from './vx-ns-pager-previous.directive';
import { VxNsPagerComponent } from './vx-ns-pager.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxNsPageComponent, VxNsPagerComponent, VxNsPagerPreviousDirective, VxNsPagerNextDirective],
  exports: [VxNsPageComponent, VxNsPagerComponent, VxNsPagerPreviousDirective, VxNsPagerNextDirective]
})
export class VxNsPagerModule {

}
