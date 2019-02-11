import { Observable } from 'rxjs';
import { AbstractVxDialogRef } from 'vx-components-base';
import { DialogCloseDataType, DialogDataType, VxNsDialogDef } from './vx-ns-dialog-def';
import { VxNsDialogComponent } from './vx-ns-dialog.component';

export class VxNsDialogRef
<ComponentType = VxNsDialogDef<any, any>,
  DataType extends DialogDataType<ComponentType> = DialogDataType<ComponentType>,
  CloseDataType extends DialogCloseDataType<ComponentType> = DialogCloseDataType<ComponentType>>
  extends AbstractVxDialogRef<ComponentType, DataType, CloseDataType> {

  overlayTap: Observable<void>;
  backButtonPress: Observable<void>;

  constructor(dialog: VxNsDialogComponent<ComponentType, DataType, CloseDataType>) {
    super(dialog);

    this.overlayTap = dialog.overlayTap.asObservable();
    this.backButtonPress = dialog.backButtonPressed.asObservable();
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

