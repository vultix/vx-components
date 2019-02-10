import { InjectionToken } from '@angular/core';
import { VxDialogComponent } from './vx-dialog.component';

export const VX_DIALOG_TOKEN = new InjectionToken<VxDialogComponent<any, any, any>>('VX_DIALOG_TOKEN');
