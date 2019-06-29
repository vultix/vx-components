import { merge, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { AbstractVxDialogRef } from 'vx-components-base';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from 'vx-components-base';
import { VxDialogComponent } from './vx-dialog.component';

export class VxDialogRef
<ComponentType = VxDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogRef<ComponentType, DataType, CloseDataType> {

  onCancel: Observable<'overlay' | 'escape'>;

  constructor(dialog: VxDialogComponent<ComponentType, DataType, CloseDataType>) {
    super(dialog);

    if (dialog.overlay) {
      this.onCancel = merge(
        dialog.overlay.overlayClick.pipe(map(() => 'overlay')) as Observable<'overlay'>,
        dialog.escapePress.pipe(map(() => 'escape')) as Observable<'escape'>
      );
    } else {
      this.onCancel = dialog.escapePress.pipe(map(() => 'escape')) as Observable<'escape'>
    }
  }
}

// class Animals extends VxNsDialogDef<'cat' | 'dog', boolean> {
//   constructor(ref: VxNsDialogRef<Animals>) {
//     super();
//
//     ref.onClose.subscribe(val => {
//       val.toFixed(2);
//     })
//   }
// }

