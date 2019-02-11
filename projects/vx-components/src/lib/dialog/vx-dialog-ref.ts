import { Observable } from 'rxjs';
import { AbstractVxDialogRef } from 'vx-components-base';
import { DialogCloseDataType, DialogDataType, VxDialogDef } from './vx-dialog-def';
import { VxDialogComponent } from './vx-dialog.component';

export class VxDialogRef
<ComponentType = VxDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogRef<ComponentType, DataType, CloseDataType> {

  overlayClick: Observable<Event>;

  constructor(dialog: VxDialogComponent<ComponentType, DataType, CloseDataType>) {
    super(dialog);

    this.overlayClick = dialog.overlay.overlayClick;
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

