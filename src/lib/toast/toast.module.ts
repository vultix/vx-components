import {NgModule} from '@angular/core';
import {VxToast} from './toast.service';
import {CommonModule} from '@angular/common';
import {VxToastComponent} from './toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VxToastComponent],
  entryComponents: [VxToastComponent],
  providers: [VxToast]
})
export class VxToastModule {

}
