import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VxDialog } from './vx-dialog';
import { VxDialogComponent } from './vx-dialog.component';
import {
  VxDialogActionsDirective,
  VxDialogContentDirective,
  VxDialogTitleDirective,
  VxFocusInitialDirective
} from './vx-dialog.directives';

@NgModule({
  imports: [CommonModule],
  declarations: [VxDialogComponent, VxDialogTitleDirective, VxDialogContentDirective, VxDialogActionsDirective, VxFocusInitialDirective],
  exports: [VxDialogTitleDirective, VxDialogContentDirective, VxDialogActionsDirective, VxFocusInitialDirective],
  entryComponents: [VxDialogComponent],
  providers: [VxDialog]
})
export class VxDialogModule {

}
