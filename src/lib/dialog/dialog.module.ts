import {NgModule} from '@angular/core';
import {VxDialogComponent} from './dialog.component';
import {VxDialog} from './dialog.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [VxDialogComponent],
  imports: [CommonModule],
  entryComponents: [VxDialogComponent],
  providers: [VxDialog]
})
export class VxDialogModule {

}
